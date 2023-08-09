/* eslint-disable no-case-declarations */
import path from 'node:path'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { anchorTagsSelector, ignoreStyle, mdContentSelector, waitElement } from './task'
import { ValidUrl, logger, setPageCookie, toMd, toPdf } from '@/utils'
import { evConfig } from '@/config'
import type { FileFormat } from '@/types'

const storeDirs = path.join(evConfig.storeDirs ?? __dirname, 'books')

// 保存内容到文件
async function saveContentToFile(
  directoryPath: string,
  filename: string,
  content: string,
  fileType: FileFormat,
) {
  const removeStyleContent = removeStyleTags(content)

  switch (fileType) {
    case 'pdf':
      const pdf = await toPdf(removeStyleContent)
      await fs.writeFile(`${filename}.pdf`, pdf)
      break
    case 'md':
      const md = await toMd(removeStyleContent)
      await fs.writeFile(`${filename}.md`, md)
      break
    case 'html':
      await fs.writeFile(`${filename}.html`, removeStyleContent)
      break
    default:
      logger.warn(`不支持的文件类型: ${fileType}`)
      break
  }

  logger.info(`保存文件${filename}.${fileType}到本地成功`)
}

// 保存章节内容到文件
async function saveSectionToFile(
  directoryPath: string,
  title: string,
  index: number,
  content: string,
  fileType: FileFormat,
) {
  const filename = path.join(directoryPath, `${index}_${title}`)
  await saveContentToFile(directoryPath, filename, content, fileType)
  logger.info(`保存小册${title}章节到本地成功`)
}

// 保存介绍内容到文件
async function saveIntroToFile(
  directoryPath: string,
  title: string,
  intro: string,
  fileType: FileFormat,
) {
  const introWithoutStyles = intro.replace(new RegExp(ignoreStyle, 'g'), '')
  if (introWithoutStyles) {
    const filename = path.join(directoryPath, 'intro')
    logger.info(`保存小册${title}介绍到本地成功`)
    await saveContentToFile(directoryPath, filename, introWithoutStyles, fileType)
  } else {
    logger.warn(`小册${title}介绍内容为空`)
  }
}
// 移除样式标签
function removeStyleTags(markdown: string): string {
  const styleTagRegex = /<style[^>]*>[\s\S]*?<\/style>/g
  return markdown.replace(styleTagRegex, '')
}

// 抓取章节内容
async function spiderSection(page, anchorTag, directoryPath, title, index, anchorTags) {
  await anchorTag.click()
  try {
    await page.waitForSelector(mdContentSelector, { timeout: 30000 })
    const elements = await page.$(mdContentSelector)
    const intro = await page.evaluate((elem) => elem.innerHTML, elements)
    await saveSectionToFile(directoryPath, title, index, intro, evConfig.filetype)
    await page.waitForTimeout(2000)
    if (anchorTags.indexOf(anchorTag) === anchorTags.length - 1) {
      logger.info(`小册${title}已成功保存到本地`)
      await page.browser().close()
      logger.info(`即将关闭浏览器 🚀 。若浏览器未关闭，可手动关闭`)
    }
  } catch (error) {
    logger.error(`出现错误：${error}`)
  }
}

// 抓取图书
export async function spiderBooks(url: string, setCookie = false) {
  logger.info(`启动 ${url} 任务 🚀`)
  const browser = await puppeteer.launch({
    headless: Boolean(evConfig.headless),
    // headless: false,
  })

  try {
    const page = await browser.newPage()
    if (setCookie) {
      await setPageCookie(page, evConfig.cookie)
    }
    await page.goto(url)
    await page.setViewport({ width: 1920, height: 1080 })
    const match = url.match(ValidUrl)
    if (!match) {
      logger.info('链接格式不正确')
      return
    }

    const targetBookId = match[1]
    const selector = `${waitElement}"${targetBookId}"]`
    await page.waitForSelector(selector, { visible: true })

    const bookInfoElement = await page.$(selector)
    if (!bookInfoElement) {
      logger.info(`未找到地址为 ${url} 的小册`)
      return
    }

    const anchorElement = await page.$(anchorTagsSelector)
    if (!anchorElement) {
      logger.info('未找到符合条件的小册链接')
      return
    }

    const href = await page.evaluate((elem) => elem.getAttribute('href'), anchorElement)
    const title = await page.evaluate((elem) => elem.textContent?.trim(), anchorElement)
    logger.info(`即将保存小册${title}到本地`)
    if (!title) return false
    const directoryPath = path.join(storeDirs, title)
    await fs.ensureDir(directoryPath)
    // 页面加载完毕执行

    await page.waitForTimeout(1000) // 等待页面加载

    const introElement = await page.$(mdContentSelector)
    if (introElement) {
      const intro = await page.evaluate((elem) => elem.innerHTML, introElement)
      await saveIntroToFile(directoryPath, title, intro, evConfig.filetype)
    }
    const fullUrl = `https://juejin.cn${href}`
    await page.goto(fullUrl)
    page.on('response', async (response) => {
      const url = response.url()
      const regurl = `https://api.juejin.cn/booklet_api/v1/booklet/get?aid=2608&uuid=`
      if (!url.includes(regurl)) {
        return
      }

      const sectionListSelector = '.section-list'
      const anchorTags = await page.$$(`${sectionListSelector} a .center .main-line .title`)
      let index = 1
      for (const anchorTag of anchorTags) {
        const bookTitle = await page.evaluate((element) => element.textContent?.trim(), anchorTag)
        await spiderSection(page, anchorTag, directoryPath, bookTitle, index, anchorTags)
        index++
      }
      if (index++ > anchorTags.length) {
        await page.browser().close()
      }
    })
  } finally {
    // await browser.close() // 关闭浏览器
  }
}

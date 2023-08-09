import path from 'node:path'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { anchorTagsSelector, ignoreStyle, mdContentSelector, waitElement } from './task'
import { ValidUrl, logger, setPageCookie } from '@/utils'
import { evConfig } from '@/config'

const storeDirs = path.join(evConfig.storeDirs ?? __dirname, 'books')

async function saveIntroToFile(directoryPath: string, title: string, intro: string) {
  const introWithoutStyles = intro.replace(new RegExp(ignoreStyle, 'g'), '')
  if (introWithoutStyles) {
    const filename = path.join(directoryPath, 'intro.md')
    await fs.writeFile(filename, introWithoutStyles)
    logger.info(`保存小册${title}介绍到本地成功`)
  } else {
    logger.warn(`小册${title}介绍内容为空`)
  }
}
function removeStyleTags(markdown: string): string {
  const styleTagRegex = /<style[^>]*>[\s\S]*?<\/style>/g
  return markdown.replace(styleTagRegex, '')
}
async function saveSectionToFile(
  directoryPath: string,
  title: string,
  index: number,
  content: string,
) {
  const filename = path.join(directoryPath, `${index}_${title}.md`)
  const removeStyleMd = removeStyleTags(content)
  await fs.writeFile(filename, removeStyleMd)
  logger.info(`保存小册${title}章节到本地成功`)
}

async function spiderSection(page, anchorTag, directoryPath, title, index, anchorTags) {
  await anchorTag.click()
  try {
    await page.waitForSelector(mdContentSelector, { timeout: 30000 })
    const elements = await page.$(mdContentSelector)
    const intro = await page.evaluate((elem) => elem.innerHTML, elements)
    await saveSectionToFile(directoryPath, title, index, intro)
    page.waitForTimeout(2000)
    if (anchorTags.indexOf(anchorTag) === anchorTags.length - 1) {
      logger.info(`小册${title}已成功保存到本地`)
      await page.browser().close()
    }
  } catch (error) {
    logger.error(`出现错误：${error}`)
  }
}

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
    const title = await page.evaluate((elem) => elem.textContent.trim(), anchorElement)
    logger.info(`即将保存小册${title}到本地`)
    const directoryPath = path.join(storeDirs, title)
    await fs.ensureDir(directoryPath)
    // 页面加载完毕执行

    await page.waitForTimeout(1000) // 等待页面加载

    const introElement = await page.$(mdContentSelector)
    if (introElement) {
      const intro = await page.evaluate((elem) => elem.innerHTML, introElement)
      await saveIntroToFile(directoryPath, title, intro)
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
        const bookTitle = await page.evaluate((element) => element.textContent.trim(), anchorTag)
        await spiderSection(page, anchorTag, directoryPath, bookTitle, index, anchorTags)
        index++
      }
    })
  } finally {
    // await browser.close() // 关闭浏览器
  }
}

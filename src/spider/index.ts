import path from 'node:path'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { anchorTagsSelector, ignoreStyle, mdContentSelector, waitElement } from './task'
import { ValidUrl, logger, setPageCookie } from '@/utils'
import { evConfig } from '@/config'

const storeDirs = path.join(evConfig.storeDirs ?? __dirname, 'books')

export async function spiderBooks(url: string, setCookie = false) {
  logger.info(`启动 ${url} 任务 🚀`)
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport({ width: 1920, height: 1080 })
    if (setCookie) {
      await setPageCookie(page, evConfig.cookie)
    }
    const match = url.match(ValidUrl)
    if (match) {
      const targetBookId = match[1]
      const selector = `${waitElement}"${targetBookId}"]`

      await page.waitForSelector(selector, { visible: true })

      const bookInfoElement = await page.$(selector)

      if (bookInfoElement) {
        const anchorElement = await page.$(anchorTagsSelector)
        if (anchorElement) {
          const href = await page.evaluate((elem) => elem.getAttribute('href'), anchorElement)
          const title = await page.evaluate((elem) => elem.textContent.trim(), anchorElement)
          logger.info(`即将保存小册${title}到本地`)
          const directoryPath = path.join(storeDirs, title)
          await fs.ensureDir(directoryPath)
          // 爬取介绍 .markdown-body
          const introElement = await page.$(mdContentSelector)
          if (introElement) {
            const intro = await page.evaluate((elem) => elem.innerHTML, introElement)

            // 移除 <style> 标签及其内容
            const introWithoutStyles = intro.replaceAll(ignoreStyle, '')

            await fs.writeFile(path.join(directoryPath, 'intro.md'), introWithoutStyles)
          }

          // await page.pdf({
          //   path: path.join(directoryPath, `${title}.pdf`),
          //   format: 'A4',
          // })
          const fullUrl = `https://juejin.cn${href}`
          await page.goto(fullUrl)
          page.on('response', async (response) => {
            const url = response.url()
            const regurl = `https://api.juejin.cn/booklet_api/v1/booklet/get?aid=2608&uuid=`
            // const thumbnailUrl = `https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/`
            // if (url.includes(thumbnailUrl)) {
            //   // 保存图片呀
            //   const content = await response.buffer()

            //   await fs.writeFile(path.join(directoryPath, 'thumbnail.png'), content)
            //   logger.info(`保存小册图片${title}到本地成功`)
            // }
            if (url.includes(regurl)) {
              // const content = await response.json()
              // const sections = content.data.sections
              // await fs.writeFile(
              //   path.join(directoryPath, 'sections.json'),
              //   JSON.stringify(sections, null, 2),
              // )
              const sectionListSelector = '.section-list' // 选择器
              const anchorTags = await page.$$(`${sectionListSelector} a .center .main-line .title`)
              let index = 1 // 初始索引值
              // 遍历所有的<a>标签
              for (const anchorTag of anchorTags) {
                try {
                  const bookTitle = await page.evaluate(
                    (element) => element.textContent.trim(),
                    anchorTag,
                  )
                  const filename = `${index}_${bookTitle}.md`
                  // 点击每个<a>标签
                  await anchorTag.click()

                  // 等待.markdown-body元素的出现
                  await page.waitForSelector(mdContentSelector)

                  const elements = await page.$(mdContentSelector)
                  const intro = await page.evaluate((elem) => elem.innerHTML, elements)
                  // 移除 <style> 标签及其内容
                  const introWithoutStyles = intro.replaceAll(ignoreStyle, '')

                  if (introWithoutStyles) {
                    logger.info(`保存小册${title} ${filename}到本地成功`)

                    await fs.writeFile(path.join(directoryPath, filename), introWithoutStyles)
                  } else {
                    logger.warn(`小册${title} ${filename}内容为空`)
                  }

                  // // 等待一段时间，以确保元素在页面上出现
                  // await page.pdf({
                  //   path: path.join(directoryPath, `${bookTitle}.pdf`),
                  //   format: 'A4',
                  // })

                  logger.info(`保存小册${title} ${filename}到本地成功`)

                  index++ // 增加索引值
                  page.waitForTimeout(2000)
                  // 如果是点击的最后一个且保存成功了 那么就关闭浏览器
                  if (anchorTags.indexOf(anchorTag) === anchorTags.length - 1) {
                    logger.info(`小册${title}已成功保存到本地`)
                    await browser.close()
                  }
                } catch (error) {
                  logger.error(`出现错误：${error}`)
                }
              }
            }
          })
          // 执行你的操作
        } else {
          logger.info('未找到符合条件的小册链接')
        }
      } else {
        logger.info(`未找到地址为 ${url} 的小册`)
      }
    } else {
      logger.info('链接格式不正确')
    }
  } finally {
    // await browser.close() // 关闭浏览器
  }
}

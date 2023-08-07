import path from 'node:path'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { ValidUrl, logger } from '@/utils'
import { evConfig } from '@/config'

const storeDirs = path.join(evConfig.storeDirs ?? __dirname, 'books')

export async function spiderBooks(url: string) {
  logger.info(`启动 ${url} 任务 🚀`)
  const browser = await puppeteer.launch({
    headless: false,
  })

  try {
    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport({ width: 1920, height: 1080 })

    const match = url.match(ValidUrl)
    if (match) {
      const targetBookId = match[1]
      await page.waitForSelector(`div[data-book-id="${targetBookId}"]`, { visible: true })

      const bookInfoElement = await page.$(`div[data-book-id="${targetBookId}"]`)
      if (bookInfoElement) {
        const anchorElement = await page.$('.title-line.text-line-2 > a')
        if (anchorElement) {
          const href = await page.evaluate((elem) => elem.getAttribute('href'), anchorElement)
          const title = await page.evaluate((elem) => elem.textContent.trim(), anchorElement)
          logger.info(`即将保存小册${title}到本地`)
          const directoryPath = path.join(storeDirs, title)
          await fs.ensureDir(directoryPath)
          // 爬取介绍 .markdown-body
          const introElement = await page.$('.markdown-body')
          if (introElement) {
            const intro = await page.evaluate((elem) => elem.innerHTML, introElement)

            // 移除 <style> 标签及其内容
            const introWithoutStyles = intro.replace(
              /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
              '',
            )

            await fs.writeFile(path.join(directoryPath, 'intro.html'), introWithoutStyles)
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
            if (url.includes(regurl)) {
              // const content = await response.json()
              // const sections = content.data.sections
              // await fs.writeFile(
              //   path.join(directoryPath, 'sections.json'),
              //   JSON.stringify(sections, null, 2),
              // )
              const sectionListSelector = '.section-list' // 选择器
              const anchorTags = await page.$$(`${sectionListSelector} a`)

              // 遍历所有的<a>标签
              for (const anchorTag of anchorTags) {
                try {
                  const textContent = await page.evaluate(
                    (element) => element.textContent.trim(),
                    anchorTag,
                  )

                  // 点击每个<a>标签
                  await anchorTag.click()

                  // 等待.markdown-body元素的出现
                  await page.waitForSelector('.markdown-body')

                  const bookTitle = textContent.replaceAll(' ', '').split('学习时长')[0]

                  logger.info(`即将保存小册${bookTitle}到本地`)
                  const elements = await page.$$('.markdown-body')
                  // 使用 page.$$eval() 方法选择类名为 "markdown-body" 的元素，并将其设置为可见
                  await page.$$eval('.markdown-body', (elements) => {
                    elements.forEach((element) => {
                      element.style.visibility = 'visible'
                    })
                  })

                  // 获取元素的边界框坐标
                  const elementRect = await page.evaluate(() => {
                    const element = document.querySelector('.markdown-body')
                    return element.getBoundingClientRect()
                  })

                  // 等待一段时间，以确保元素在页面上出现
                  await page.waitForTimeout(1000)

                  // 将指定区域的屏幕截图
                  // const screenshot = await page.screenshot({
                  //   clip: {
                  //     x: Math.floor(elementRect.x),
                  //     y: Math.floor(elementRect.y),
                  //     width: Math.ceil(elementRect.width),
                  //     height: Math.ceil(elementRect.height),
                  //   },
                  // })

                  // console.log(
                  //   '%c [ screenshot ]-108',
                  //   'font-size:13px; background:pink; color:#bf2c9f;',
                  //   screenshot,
                  // )
                  // await page.setContent(
                  //   `<html><body><img src="data:image/png;base64,${screenshot.toString(
                  //     'base64',
                  //   )}" /></body></html>`,
                  // )

                  await page.pdf({
                    path: path.join(directoryPath, `${bookTitle}.pdf`),
                    format: 'A4',
                  })

                  await page.waitForTimeout(2000)
                  logger.info(`保存小册${bookTitle}到本地成功`)
                } catch (error) {
                  console.error(`出现错误：${error}`)
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

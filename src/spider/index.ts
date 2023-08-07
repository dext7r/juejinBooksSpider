import path from 'node:path'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { ValidUrl, logger } from '@/utils'

export async function spiderBooks(url: string) {
  logger.info(`启动 ${url} 任务 🚀`)
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()
    await page.goto(url)

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
          const directoryPath = path.join(__dirname, title)
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

          const fullUrl = `https://juejin.cn${href}`
          await page.goto(fullUrl)
          await page.on('response', async (response) => {
            const url = response.url()
            const regurl = `https://api.juejin.cn/booklet_api/v1/booklet/get?aid=2608&uuid=`
            if (url.includes(regurl)) {
              const content = await response.json()
              const sections = content.data.sections
              await fs.writeFile(
                path.join(directoryPath, 'sections.json'),
                JSON.stringify(sections, null, 2),
              )
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

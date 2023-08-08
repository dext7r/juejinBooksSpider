import https from 'node:https'
import fs from 'node:fs'
import puppeteer from 'puppeteer'
import { logger } from '@/utils'

export async function downloadImage(imageUrl: string, savePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(imageUrl, (response) => {
        console.log(
          '%c [ imageUrl ]-8',
          'font-size:13px; background:pink; color:#bf2c9f;',
          imageUrl,
        )
        const fileStream = fs.createWriteStream(savePath)
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          logger.info(`已下载图片: ${savePath}`)
          fileStream.close()
          resolve()
        })
      })
      .on('error', (error) => {
        logger.error(`下载图片失败: ${savePath}`, error)
        reject(error)
      })
  })
}

export async function saveElementAsAVIF(
  url: string,
  selector: string,
  savePath: string,
): Promise<void> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const element = await page.$(selector)
  if (element) {
    await element.screenshot({
      path: savePath,
      type: 'avif',
      omitBackground: true,
    })
    logger.info(`已保存图片: ${savePath}`)
  } else {
    logger.error('未找到匹配的元素')
  }

  await browser.close()
}

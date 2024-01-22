import { juejinBookRegurl, juejinUrl } from '.'
import { getBrowser, logger, setPageCookie } from '@/utils'
import type { Booklet } from '@/types'

export async function getAllBooksList(cookie: string) {
  const browser = await getBrowser()
  if (!browser) return
  const page = await browser.newPage()
  let data: Booklet[] // 存储小册数据的变量
  try {
    await page.goto(juejinUrl)
    await setPageCookie(page, cookie)
    await page.goto(juejinUrl)
    // 点击.avatar-wrapper
    await page.click('.avatar-wrapper')
    // 等待 a 标签的 href 属性为 /my-course 的元素出现
    await page.waitForSelector('a[href="/my-course"]')

    // 点击 a 标签的 href 属性为 /my-course 的元素
    await page.click('a[href="/my-course"]')

    await page.waitForNavigation()
    // 等待元素加载完成 .books-container
    await page.waitForSelector('.books-container')
    // 刷新页面
    await page.reload()

    // 创建一个Promise
    const dataPromise = new Promise<Booklet[]>((resolve) => {
      // 获取所有的书籍
      page.on('response', async (response) => {
        const url = response.url()
        if (url.includes(juejinBookRegurl)) {
          const content = await response.json()
          const { data: books = [] } = content
          if (books.length) {
            logger.info(`共有${books.length}本小册`)
            const buyBooks = books.filter((item: { is_buy: boolean }) => item.is_buy)
            logger.info(`共有${buyBooks.length}本已购小册`)
            data = buyBooks
          } else {
            logger.warn('获取小册数量为0，可能是 cookie 失效了，或者是没有购买小册')
          }
          resolve(data) // 解析Promise并返回数据
        }
      })
    })

    // 等待Promise解析并返回数据
    data = await dataPromise
  } finally {
    // await browser.close() // 关闭浏览器
    return data
  }
}

import process from 'node:process'
import { spiderBooks } from './spider'
import { getAllBooksList, juejinBookSectionUrl } from './spider/task'
import { evConfig } from '@/config'
import { inquirerCourse, isValidUrl, logger, runDevCommand } from '@/utils'

async function processBooks() {
  logger.info(`开始获取小册信息`)
  const book = (await getAllBooksList(evConfig.cookie)) ?? []
  const promises: Promise<void>[] = book.map(async (item) => {
    if (evConfig.ignoreCourses.includes(item.booklet_id)) {
      logger.info(`忽略小册：${item.base_info.title}`)
      return
    }
    await runDevCommand(juejinBookSectionUrl, item.booklet_id, item.base_info.title)
  })
  await Promise.all(promises)
  logger.info(`所有小册爬取完成`)
}
async function main() {
  try {
    // 获取脚本文件路径
    const args = process.argv.slice(2) // 排除前两个默认参数（node 和脚本文件路径）
    const url = args[0] // 第一个参数作为小册链接
    // 如果没有设置爬取所有小册，且设置了课程，则开始爬取课程
    const setCookie = evConfig.cookie.length > 0

    if (evConfig.spiderAll && setCookie) {
      await processBooks()
      process.exit(0)
    } else if (url && isValidUrl(url)) {
      logger.info('开始爬取指定小册')
      await spiderBooks(url || evConfig.course, setCookie)
    } else {
      logger.error('请输入正确的小册地址')
      // 请输入正确的小册地址
      const url = await inquirerCourse()
      await spiderBooks(url, setCookie)
    }
    // process.exit(0)
  } catch (error) {
    logger.error(error)
    // process.exit(1)
  }
}

main()

import process from 'node:process'
import { spiderBooks } from './spider'
import { getAllBooksList, juejinBookSectionUrl } from './spider/task'
import { evConfig } from '@/config'
import { inquirerCourse, isValidUrl, logger } from '@/utils'

async function main() {
  // 获取脚本文件路径
  const args = process.argv.slice(2) // 排除前两个默认参数（node 和脚本文件路径）
  const url = args[0] // 第一个参数作为小册链接
  // 如果没有设置爬取所有小册，且设置了课程，则开始爬取课程
  const setCookie = evConfig.cookie.length > 0
  if (evConfig.spiderAll === true && evConfig.course && setCookie) {
    logger.info(`开始爬取所有已购买小册`)
    const book = await getAllBooksList(evConfig.cookie)
    // 多线程爬取小册
    book?.forEach((item) => {
      spiderBooks(juejinBookSectionUrl + item.booklet_id, setCookie)
    })
  } else if (url && isValidUrl(url)) {
    logger.info('开始爬取指定小册')
    await spiderBooks(url || evConfig.course, setCookie)
  } else {
    logger.error('请输入正确的小册地址')
    // 请输入正确的小册地址
    const url = await inquirerCourse()
    await spiderBooks(url, setCookie)
  }
}

main()

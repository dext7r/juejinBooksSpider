import process from 'node:process'
import { spiderBooks } from './spider'
import { spiderAllBooks } from './spider/spiderAll'
import { juejinBookSectionUrl } from './spider/task'
import { inquirerCourse, isValidUrl, logger } from '@/utils'
import { evConfig } from '@/config'

async function main() {
  const args = process.argv.slice(2) // 排除前两个默认参数（node 和脚本文件路径）
  const url = args[0] // 第一个参数作为小册链接
  const setCookie = evConfig.cookie.length > 0
  if ((url && isValidUrl(url)) || isValidUrl(evConfig.course) || !evConfig.spiderAll) {
    logger.info('开始爬取指定小册')
    await spiderBooks(url || evConfig.course, setCookie)
  } else if (setCookie && Boolean(evConfig.spiderAll)) {
    logger.info('开始爬取所有已购买小册')
    const book = await spiderAllBooks(evConfig.cookie)
    // 多线程爬取小册
    book?.forEach((item, i) => {
      setTimeout(() => {
        spiderBooks(juejinBookSectionUrl + item.booklet_id, setCookie)
      }, i * 3000) // 每个任务延迟 3 秒执行
    })
  } else {
    logger.error('请输入正确的小册地址')
    const url = await inquirerCourse()
    await spiderBooks(url, setCookie)
  }
}

main()

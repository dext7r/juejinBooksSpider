import process from 'node:process'
import { spiderBooks } from './spider'
import { inquirerCourse, isValidUrl } from '@/utils'
import { evConfig } from '@/config'

console.log('%c [ evConfig ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', evConfig.course)

async function main() {
  const args = process.argv.slice(2) // 排除前两个默认参数（node 和脚本文件路径）
  const url = args[0] // 第一个参数作为小册链接
  if (isValidUrl(evConfig.course)) {
    spiderBooks(evConfig.course)
  } else if (!url || !isValidUrl(url)) {
    const url = await inquirerCourse()
    await spiderBooks(url)
  }
}

main()

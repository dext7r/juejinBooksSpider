import inquirer from 'inquirer'
import { spiderBooks } from './spider'
import { isValidUrl, logger } from '@/utils'

async function main() {
  const args = process.argv.slice(2) // 排除前两个默认参数（node 和脚本文件路径）
  const url = args[0] // 第一个参数作为小册链接

  // 如果未输入url或者为空，使用inquirer提示用户输入小册链接
  if (!url || !isValidUrl(url)) {
    const { url } = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: '请输入小册链接：',
        validate: (val) => {
          if (val && isValidUrl(val)) {
            return true
          }
          return '请输入合法的小册链接，例如https://juejin.cn/book/6844723704639782920'
        },
      },
    ])
    logger.info(`你输入的小册链接是：${url}`)
    await spiderBooks(url)
  } else {
    logger.info(`你输入的小册链接是：${url}`)
    await spiderBooks(url)
  }
}

main()

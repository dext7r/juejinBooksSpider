import inquirer from 'inquirer'
import { isValidUrl } from '..'

export async function inquirerCourse() {
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
  return url
}

import { PuppeteerLaunchOptions } from 'puppeteer'

import type { Browser } from 'puppeteer'

// 全局变量
declare global {
  namespace globalThis {
    var _browser: Browser | null
  }

  interface Window {
    extendsPropName: {
      _browser: Browser | null
    }
  }
}

// 导出类型
export type FileFormat = 'pdf' | 'md' | 'html' | ''
export interface EvConfig {
  // 日志记录
  log: string | boolean
  // 文件存储目录
  storeDirs: string
  // 保存cookie
  cookie: string
  // 课程
  course: string
  // 扫描所有
  spiderAll: string | boolean
  // 是否启用浏览器
  headless: string | boolean
  // 文件类型
  filetype: FileFormat
  // puppeteer launch options
  puppeteerOptions: PuppeteerLaunchOptions

  ignoreCourses: string[]
}

type UserInfo = {
  // 用户ID
  user_id: string
  // 用户名
  user_name: string
  // 公司名称
  company: string
  // 职位
  job_title: string
}

export type BookBaseInfo = {
  title: string
  summary: string
}


export type Booklet = {
  // 图书编号
  booklet_id: string
  // 是否购买
  is_buy: boolean
  // 是否新书
  is_new: boolean
  // 用户信息
  user_info: UserInfo

  //
  base_info: BookBaseInfo
}

import { PuppeteerLaunchOptions } from 'puppeteer'

export type FileFormat = 'pdf' | 'md' | 'html' | ''

export interface EvConfig {
  log: string | boolean
  storeDirs: string
  cookie: string
  course: string
  spiderAll: string | boolean
  headless: string | boolean
  filetype: FileFormat
  puppeteerOptions: PuppeteerLaunchOptions
}
type DiscountInfo = {
  discount_type: number
  discount_id: string
  coupon_id: string
  coupon_basic_id: string
  name: string
  desc: string
  // 其他属性...
}

type BaseInfo = {
  id: number
  booklet_id: string
  title: string
  price: number
  // 其他属性...
}

type ReadingProgress = {
  id: number
  booklet_id: string
  user_id: string
  status: number
  buy_type: number
  // 其他属性...
}

type UserInfo = {
  user_id: string
  user_name: string
  company: string
  job_title: string
  // 其他属性...
}

export type Booklet = {
  booklet_id: string
  base_info: BaseInfo
  is_buy: boolean
  is_new: boolean
  max_discount: DiscountInfo
  reading_progress: ReadingProgress
  section_updated_count: number
  user_info: UserInfo
}

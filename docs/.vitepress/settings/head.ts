import type { HeadConfig } from 'vitepress'
import { keywords } from '../../../package.json'

export const head: HeadConfig[] = [
  ['meta', { name: 'keywords', content: keywords }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-OYbCZh4rt9' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-icon', href: 'https://www.h7ml.cn/logo.png?q=juejinBooksSpider' }],
  [
    'link',
    {
      rel: 'mask-icon',
      href: 'https://www.h7ml.cn/logo.png?q=juejinBooksSpider',
      color: '#3eaf7c',
    },
  ],
  [
    'meta',
    {
      name: 'msapplication-TileImage',
      content: 'https://www.h7ml.cn/logo.png?q=juejinBooksSpider',
    },
  ],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  [
    'script',
    {
      charset: 'UTF-8',
      id: 'LA_COLLECT',
      src: '//sdk.51.la/js-sdk-pro.min.js?id=K0H1mns8NCFL0WWv&ck=K0H1mns8NCFL0WWv&autoTrack=true&hashMode=true',
    },
  ],
  [
    'script',
    {
      charset: 'UTF-8',
      id: 'LA-DATA-WIDGET',
      crossorigin: 'anonymous',
      src: 'https://v6-widget.51.la/v6/K0H1mns8NCFL0WWv/quote.js?theme=0&f=12',
    },
  ],
]

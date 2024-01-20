import type { DefaultTheme } from 'vitepress'
import { nav, sidebar, site } from '../settings'

export const themeConfig: DefaultTheme.Config = {
  outlineTitle: '本页目录',
  lastUpdatedText: '上次更新',
  i18nRouting: false,
  logo: 'https://www.h7ml.cn/logo.png?q=juejinBooksSpider',
  nav: [...nav, ...site],
  sidebar,
  carbonAds: {
    code: 'your-carbon-code',
    placement: 'your-carbon-placement',
  },
  outline: {
    level: 'deep',
    label: '本页目录',
  },
  editLink: {
    pattern: 'https://github.com/h7ml/juejinbooksspider/edit/master/docs/:path',
    text: '在 GitHub 上编辑此页',
  },

  socialLinks: [{ icon: 'github', link: 'https://github.com/h7ml/juejinbooksspider' }],
  darkModeSwitchLabel: '外观',
  returnToTopLabel: '返回顶部',

  /* Algolia DocSearch 配置 */
  // algolia,

  docFooter: {
    prev: '上一篇',
    next: '下一篇',
  },
  footer: {
    message:
      'Released under the <a href="https://github.com/h7ml/juejinbooksspider/blob/master/LICENSE">MIT License</a>.',
    copyright:
      '<a target="_blank" title="51la网站统计" href="https://v6.51.la/land/K0H1mns8NCFL0WWv">51la网站统计</a><br />Copyright © 2024-present <a href="https://h7ml.github.io/juejinbooksspider">juejinbooksspider</a>',
  },
}

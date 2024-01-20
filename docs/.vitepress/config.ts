import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import type { PageData } from 'vitepress'
import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

import pkg from '../../package.json'

// import { algolia, head, nav, sidebar } from './configs'

const links: { url: string; lastmod: PageData['lastUpdated'] }[] = []

export default defineConfig({
  outDir: '../dist',
  // eslint-disable-next-line n/prefer-global/process
  base: process.env.APP_BASE_PATH || '/',

  lang: 'zh-CN',
  title: pkg.name,
  description: pkg.description,
  // head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },
  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        ignoreIndexItem: true,
        // You can also set options to adjust sidebar data
        // see option document below
      }),
    ],
  },
  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.png',

    // nav,
    // sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/h7ml' }],

    footer: {
      message: 'juejinBooksSpider',
      copyright: 'Copyright © 2024-present h7ml',
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    /* Algolia DocSearch 配置 */
    // algolia,

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },

  /* 生成站点地图 */
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://h7ml.github.io/juejinbooksspider/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    // eslint-disable-next-line promise/param-names
    await new Promise((r) => writeStream.on('finish', r))
  },
})

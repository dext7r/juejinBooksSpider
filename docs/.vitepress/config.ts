import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import type { PageData } from 'vitepress'
import { defineConfig } from 'vitepress'
import { cut } from '@node-rs/jieba'
import { SearchPlugin } from 'vitepress-plugin-search'

import pkg from '../../package.json'

import { head, themeConfig } from './settings'

const links: { url: string; lastmod: PageData['lastUpdated'] }[] = []

export default defineConfig({
  outDir: '../dist',
  // eslint-disable-next-line n/prefer-global/process
  base: process.env.APP_BASE_PATH || '/',

  lang: 'zh-CN',
  title: pkg.name,
  description: pkg.description,
  head,
  themeConfig,
  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    languageAlias: {
      svg: 'html',
    },
    headers: {
      level: [0, 0],
    },
  },
  vite: {
    plugins: [
      SearchPlugin({
        previewLength: 20,
        buttonLabel: '搜索',
        placeholder: '文章搜索',
        tokenize(str) {
          return cut(str, false)
        },
      }),
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('custom-'),
      },
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

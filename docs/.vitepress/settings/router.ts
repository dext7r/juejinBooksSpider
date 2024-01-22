import AutoConfigureNavSidebarPlugin from '@w3ctech-editorial-department/vitepress-auto-configure-nav-sidebar'

const site = [
  {
    text: '前端物语',
    link: 'https://www.h7ml.cn',
  },
]
const { nav, sidebar } = AutoConfigureNavSidebarPlugin({
  ignoreFolders: ['.vitepress', 'public', ''],
  ignoreFiles: ['log.txt'],
  // dirPrefix: '',
  // filePrefix: 'docs',
  showNavIcon: false,
  showSidebarIcon: true,
  collapsed: true,
  singleLayerNav: true,
})

export { nav, sidebar, site }

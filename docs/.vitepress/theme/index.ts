import { h } from 'vue'
import { useData } from 'vitepress'
import Theme from 'vitepress/theme'

// import './styles/index.scss'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import vitepressLifeProgress from 'vitepress-plugin-life-progress'
import 'vitepress-plugin-life-progress/lib/css/index.css'

// import 'vitepress-plugin-sandpack/dist/style.css'

import 'vitepress-plugin-back-to-top/dist/style.css'

export default Object.assign({}, Theme, {
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(Theme.Layout, props)
  },
  setup() {
    vitepressLifeProgress()
  },
  enhanceApp: (ctx) => {
    // googleAnalytics({
    //   id: 'G-DTRHS9NHB5', // Replace with your GoogleAnalytics ID, which should start with the 'G-'
    // }),
    //   vitepressBackToTop({
    //     threshold: 300,
    //   })
    // vitepressNprogress(ctx), ctx.app.component('Sandbox', Sandbox)
    // enhanceAppWithTabs(ctx)
  },
})

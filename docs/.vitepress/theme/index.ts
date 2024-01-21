import { h } from 'vue'
import { useData } from 'vitepress'
import Theme from 'vitepress/theme'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import vitepressLifeProgress from 'vitepress-plugin-life-progress'
import 'vitepress-plugin-life-progress/lib/css/index.css'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import 'vitepress-plugin-back-to-top/dist/style.css'
import googleAnalytics from 'vitepress-plugin-google-analytics'

export default {
  ...Theme,
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
    googleAnalytics({
      id: 'G-DTRHS9NHB5',
    }),
      vitepressBackToTop({
        threshold: 300,
      })
  },
}

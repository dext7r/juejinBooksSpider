export const bookRegUrl = `https://api.juejin.cn/booklet_api/v1/booklet/get?aid=2608&uuid=` // 小册的接口
export const bookThumbnailUrl = `https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/` // 小册的封面图
export const bookSectionListSelector = '.section-list' // 小册的章节列表选择器
export const bookSectionContentSelector = '.section-content' // 小册的章节内容选择器
export const bookSectionTitleSelector = '.section-title' // 小册的章节标题选择器
export const bookSectionAnchorSelector = '.section-anchor' // 小册的章节锚点选择器
export const bookSectionAnchorActiveSelector = '.section-anchor-active' // 小册的章节锚点激活选择器
export const anchorTagsSelector = `.title-line.text-line-2 > a` // 小册的锚点选择器
export const waitElement = 'div[data-book-id=' // 等待元素
export const mdContentSelector = '.markdown-body' // markdown内容选择器
export const ignoreStyle = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi // 忽略的样式
export const courseUrl = 'https://juejin.cn/my-course' // 我的小册地址
export const juejinUrl = 'https://juejin.cn' // 掘金地址
export const juejinBookRegurl = `https://api.juejin.cn/booklet_api/v1/booklet/bookletshelflist` // 掘金小册地址
export const juejinBookSectionUrl = `https://juejin.cn/book/` // 掘金小册章节地址

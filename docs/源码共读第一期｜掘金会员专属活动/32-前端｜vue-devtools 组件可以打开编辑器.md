# 前端｜vue-devtools 组件可以打开编辑器

### 本章任务提供

[若川](https://juejin.cn/user/1415826704971918 "https://juejin.cn/user/1415826704971918")

## 学习文章

* 学习文章，其实跟vue和react相关性不大，而是nodejs小项目，不会nodejs也能基本看懂。
* 据说 99% 的人不知道 vue-devtools 还能直接打开对应组件文件？本文原理揭秘

* 博客地址：[lxchuan12.gitee.io/open-in-edi…](https://link.juejin.cn?target=http%3A%2F%2Flxchuan12.gitee.io%2Fopen-in-editor "https://link.juejin.cn?target=http%3A%2F%2Flxchuan12.gitee.io%2Fopen-in-editor")
* 掘金地址：[juejin.cn/post/695934…](https://juejin.cn/post/6959348263547830280 "https://juejin.cn/post/6959348263547830280")

**共读目的**

* 帮助学会调试源码
* 锻炼耐心
* 学会查阅资料
* 学以致用 打开组件文件

**学习流程**

* 安装 vue-devtools 对应 vue3 的版本。无法访问谷歌应用市场的小伙伴，可以下方链接去下载安装。
* [或者点此下载安装 vue3版本的vue-devtools](https://link.juejin.cn?target=https%3A%2F%2Fchrome.zzzmh.cn%2Finfo%3Ftoken%3Dljjemllljcmogpfapbkkighbhhppjdbg "https://link.juejin.cn?target=https%3A%2F%2Fchrome.zzzmh.cn%2Finfo%3Ftoken%3Dljjemllljcmogpfapbkkighbhhppjdbg")
* [点此下载安装 vue2 版本的 vue-devtools](https://link.juejin.cn?target=https%3A%2F%2Fchrome.zzzmh.cn%2Finfo%3Ftoken%3Dnhdogjmejiglipccpnnnanhbledajbpd "https://link.juejin.cn?target=https%3A%2F%2Fchrome.zzzmh.cn%2Finfo%3Ftoken%3Dnhdogjmejiglipccpnnnanhbledajbpd")
* 克隆项目，按照文章中流程，先跑起来
* [本文仓库地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flxchuan12%2Fopen-in-editor.git "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flxchuan12%2Fopen-in-editor.git")：git clone [github.com/lxchuan12/o…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flxchuan12%2Fopen-in-editor.git%25EF%25BC%258C%25E6%259C%25AC%25E6%2596%2587%25E6%259C%2580%25E4%25BD%25B3%25E9%2598%2585%25E8%25AF%25BB%25E6%2596%25B9%25E5%25BC%258F%25EF%25BC%258C%25E5%2585%258B%25E9%259A%2586%25E4%25BB%2593%25E5%25BA%2593%25E8%2587%25AA%25E5%25B7%25B1%25E5%258A%25A8%25E6%2589%258B%25E8%25B0%2583%25E8%25AF%2595%25EF%25BC%258C%25E5%25AE%25B9%25E6%2598%2593%25E5%2590%25B8%25E6%2594%25B6%25E6%25B6%2588%25E5%258C%2596%25E3%2580%2582 "https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flxchuan12%2Fopen-in-editor.git%25EF%25BC%258C%25E6%259C%25AC%25E6%2596%2587%25E6%259C%2580%25E4%25BD%25B3%25E9%2598%2585%25E8%25AF%25BB%25E6%2596%25B9%25E5%25BC%258F%25EF%25BC%258C%25E5%2585%258B%25E9%259A%2586%25E4%25BB%2593%25E5%25BA%2593%25E8%2587%25AA%25E5%25B7%25B1%25E5%258A%25A8%25E6%2589%258B%25E8%25B0%2583%25E8%25AF%2595%25EF%25BC%258C%25E5%25AE%25B9%25E6%2598%2593%25E5%2590%25B8%25E6%2594%25B6%25E6%25B6%2588%25E5%258C%2596%25E3%2580%2582")
* 调试全流程
* 记录笔记

[原文地址](https://juejin.cn/book/7169108142868365349/section/7178739231848661003)
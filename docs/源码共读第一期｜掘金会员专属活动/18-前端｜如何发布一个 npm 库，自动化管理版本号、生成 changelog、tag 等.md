# 前端｜如何发布一个 npm 库，自动化管理版本号、生成 changelog、tag 等

### 本章任务提供

[若川](https://juejin.cn/user/1415826704971918 "https://juejin.cn/user/1415826704971918")

### 学习任务

* 参考学习文章[《还在用开发者工具上传小程序? 快来试试 miniprogram-ci 提效摸鱼》](https://juejin.cn/post/7124467547163852808 "https://juejin.cn/post/7124467547163852808")，按照文章**只学 release-it 部分（也就是第7小节）** ，非常通用。生成 changelog 、打 tag、自动管理版本号
* 最后可以发一个简单的包到 npm 上，可以使用 npx xxx -v 显示版本，作为结果。有能力觉得需要，也可以学我的这篇文章的其他部分。
* npx @ruochuan/mini-ci -v 查看版本
* npx @ruochuan/mini-ci -h 查看帮助信息
* 可以参考我的仓库，我是如何发布包的~
* [github.com/lxchuan12/m…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flxchuan12%2Fmini-ci "https://github.com/lxchuan12/mini-ci")
* 还可以参考这篇文章：[图文结合简单易学的npm 包的发布流程](https://juejin.cn/post/7125709933709885448 "https://juejin.cn/post/7125709933709885448")

### 辅助工具

基于微信小程序 [`miniprogram-ci`](https://link.juejin.cn?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fdevtools%2Fci.html "https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html") 开发的**更快速、更方便且支持多选等功能**的小程序上传、预览自动化工具：[github.com/lxchuan12/m…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flxchuan12%2Fmini-ci "https://github.com/lxchuan12/mini-ci")

[原文地址](https://juejin.cn/book/7169108142868365349/section/7169115927999414279)
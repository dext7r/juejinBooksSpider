<h1 align="center">📚 掘金小册爬虫 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/h7ml/juejinBooksSpider#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/h7ml/juejinBooksSpider/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="./cache/books/" target="_blank">
    <img alt="License: Apache--2.0" src="https://nakoruru.h7ml.cn/proxy/img.shields.io/badge/小册阅读-4ABF8A?logo=Blovin&logoColor=fff" />
  </a>
</p>

> 🕷️ 掘金小册爬虫脚本。将小册保存为 markdown，pdf，html 格式

## 📜 说明

[本项目案例](https://h7ml.github.io/juejinBooksSpider/cache/books/)使用爬虫爬取的为公开的掘金小册。可在[掘金小册/阅读](https://juejin.cn/course/article) 中查看。本项目仅供学习交流使用，请勿将个人付费小册公开。⚠️ 若公开由此造成的一切后果，与本项目无关。

## 🛠 使用

### 👥 clone 项目

```bash
git clone https://github.com/h7ml/juejinBooksSpider.git
cd juejinBooksSpider
```

### 📦 install 依赖

```bash
pnpm install

# or
# npm install

# or
# yarn install
```

### 🎲 运行

```bash
# 爬取单本小册
# pnpm start <小册地址>
pnpm start https://juejin.cn/book/6844723704639782920

# 爬取多本小册 需要配置cookie 并且设置spiderAll为true 到.env文件。然后执行 pnpm start 即可

```

### 📁 配置文件说明

#### 📋 类型定义

```ts
// \src\types.d.ts
export type FileFormat = 'pdf' | 'md' | 'html' | ''

export interface EvConfig {
  log: string | boolean
  storeDirs: string
  cookie: string
  course: string
  spiderAll: string | boolean
  headless: string | boolean
  filetype: FileFormat
  puppeteerOptions: PuppeteerLaunchOptions
}
```

#### ⚙️ .env

- `cookie`：掘金网站的 Cookie，用于爬取授权访问的小册。
- `isLog`：是否输出日志形式，默认为 `true`。开启后将在`dist`目录下产生`log`文件。
- `storeDir`：小册保存的目录，默认为`cache`。表示当前目录下的`cache`目录。
- `course`：小册地址，默认为`https://juejin.cn/book/6844723704639782920`。若命令行中传入了小册地址，则以命令行中的地址为准。
- `spiderAll`：是否爬取所有小册，默认为`false`。若为`true`，则会爬取所有小册，否则只爬取`course`中指定的小册。
- `filetype`: 保存的文件类型，默认为`md`。可选值为`md`、`pdf`、`html`。
- `headless`: 是否使用无头浏览器，默认为`true`。若为`false`，则会使用有头浏览器，方便调试。文档参考：[puppeteer](https://pptr.dev/troubleshooting/#chrome-headless-disables-gpu-compositing)

#### ⚙️ `puppeteerOptions`

`puppeteerOptions` 为`puppeteer`的启动参数，非必须。文档参考：[puppeteer](https://pptr.dev/browsers-api/browsers.launchoptions/) 如需修改。请在[config](src/config/index.ts) 中配置

- 若你在`wsl` 中使用，需要安装`google-chrome` 然后配置`puppeteerOptions`参数为`{executablePath: 'google-chrome'}` 即可。文档参考[install-google-chrome-wsl](https://www.tiredsg.dev/blog/install-google-chrome-wsl/) [@croatialu](https://github.com/croatialu)

- 感谢 [@croatialu](https://github.com/croatialu) [@maomao1996](https://github.com/maomao1996) [@Dnzzk2](https://github.com/Dnzzk2) 提供了灵感和建议

### 🏠 [主页](https://h7ml.github.io/juejinBooksSpider/cache)

## 👤 作者

👤 **h7ml**

- Github: [@h7ml](https://github.com/h7ml)

## 🤝 贡献者

贡献、问题和功能请求都受到欢迎！<br />欢迎[提出问题和建议](https://github.com/h7ml/juejinBooksSpider/issues/new). 您也可以查阅 [贡献指南](https://github.com/h7ml/juejinBooksSpider/blob/master/CONTRIBUTING.md).

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**7**</kbd>

<a href="https://github.com/h7ml" title="h7ml">
  <img src="https://avatars.githubusercontent.com/u/55233292?v=4" width="50" />
</a>
<a href="https://github.com/yyx990803" title="yyx990803">
  <img src="https://avatars.githubusercontent.com/u/499550?v=4" width="50" />
</a>
<a href="https://github.com/sdras" title="sdras">
  <img src="https://avatars.githubusercontent.com/u/2281088?v=4" width="50" />
</a>
<a href="https://github.com/antfu" title="antfu">
  <img src="https://avatars.githubusercontent.com/u/11247099?v=4" width="50" />
</a>
<a href="https://github.com/croatialu" title="croatialu">
  <img src="https://avatars.githubusercontent.com/u/22277972?v=4" width="50" />
</a>
<a href="https://github.com/gaearon" title="gaearon">
  <img src="https://avatars.githubusercontent.com/u/810438?v=4" width="50" />
</a>
<a href="https://github.com/ReAbout" title="ReAbout">
  <img src="https://avatars.githubusercontent.com/u/9333053?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

## 📝 许可协议

版权所有 © 2023 [h7ml](https://github.com/h7ml)。<br />
本项目使用 [Apache--2.0](https://github.com/h7ml/juejinBooksSpider/blob/master/LICENSE) 许可协议。

---

_此 README 是通过 [readme-md-generator](https://github.com/kefranabg/readme-md-generator) ❤️ 生成的_

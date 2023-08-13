import html2md from 'html-to-md'
import hpdf from 'hpdf'

const generator = new hpdf.PdfGenerator({
  min: 3,
  max: 10,
})

export async function toMd(html: string) {
  return await html2md(html)
}
export async function toPdf(html: string) {
  return await generator.generatePDF(html)
}

export async function sleepAsync(milliseconds: number): Promise<void> {
  // 使用Promise实现异步操作
  return new Promise((resolve) => {
    // 设置定时器，每隔milliseconds毫秒执行resolve函数
    setTimeout(resolve, milliseconds)
  })
}

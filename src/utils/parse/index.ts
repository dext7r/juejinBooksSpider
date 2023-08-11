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

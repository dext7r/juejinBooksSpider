import dayjs from 'dayjs'

export function formatDate(date?: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const targetDate = date ? dayjs(date) : dayjs() // 使用当前时间如果未传递日期参数
  const formattedDate = dayjs(targetDate).format(format)
  return formattedDate
}

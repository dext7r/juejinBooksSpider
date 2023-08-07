export const ValidUrl = /https:\/\/juejin.cn\/book\/(\d+)/
export function isValidUrl(url) {
  return ValidUrl.test(url)
}

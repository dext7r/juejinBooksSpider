export async function setPageCookie(page: { setCookie: (arg0: any) => any }, cookie: string) {
  const cookies = cookie.split(';').map((pair) => {
    const name = pair.trim().slice(0, pair.trim().indexOf('='))
    const value = pair.trim().slice(pair.trim().indexOf('=') + 1)
    return { name, value, domain: '.juejin.cn' }
  })
  await page.setCookie(cookies)
}

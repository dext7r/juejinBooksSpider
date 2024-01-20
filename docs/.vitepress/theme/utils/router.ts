import { sideBar } from 'vitepress-plugin-sidebar'

interface MenuItem {
  link: string
  items?: MenuItem[]
}

interface SidebarOptions {
  ignoreMDFiles?: string[]
  ignoreDirectory?: string[]
  collapsed?: boolean
  collapsible?: boolean
}

export function getSidebar(path: string, options?: SidebarOptions) {
  const {
    ignoreMDFiles = ['index'],
    ignoreDirectory = ['node_modules'],
    collapsed = false,
    collapsible = true,
  } = options || {}
  return sideBar(path, {
    ignoreMDFiles,
    ignoreDirectory,
    collapsed,
    collapsible,
  })
}

export function mergeSidebarRoutes(routes: MenuItem[]) {
  const mergedRoutesMap: Record<string, MenuItem> = routes.reduce((map, route) => {
    const { link, items } = route
    const existingRoute = map[link]
    if (existingRoute) {
      existingRoute.items = existingRoute.items ? [...existingRoute.items, ...items] : items
    } else {
      map[link] = route
    }
    return map
  }, {} as Record<string, MenuItem>)

  return Object.values(mergedRoutesMap)
}
function mergeSidebarItems(parentItems: MenuItem[], childItems: MenuItem[]) {
  for (const childItem of childItems) {
    const parentItem = parentItems.find((item) => item.link === childItem.link)
    if (parentItem) {
      mergeSidebarItems(parentItem.items || [], childItem.items || [])
    } else {
      parentItems.push(childItem)
    }
  }
}

export function getRouter(path: string) {
  const routes = getSidebar(path)
  return mergeSidebarRoutes(routes)
}

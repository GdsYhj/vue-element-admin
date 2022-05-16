import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
import { ganerAuthData } from '@bwrong/auth-tool'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const permissions = [
  {
    'id': 1,
    'permission': 'permission', // 权限标识，因为该数据为后端返回，所以权限标识的key，不同项目可能会不一样，所以提供下面authKey的参数用来配置key名
    'name': '系统管理',
    'type': 0,
    'parentId': 0
  },
  {
    'id': 4,
    'permission': 'user',
    'name': '用户管理',
    'type': 0,
    'parentId': 0
  },
  {
    'id': 4,
    'permission': '34535345345',
    'name': '用户管理',
    'type': 0,
    'parentId': 0
  }

]

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // 在这里，直接请求后端，获取权限配置表，然后做下个做一个数据缓存（用来页面中具体元素的权限处理），
      // 把权限配置表（一维护数组）传到store/permission 中进行路由过滤和路由名称图标修改。
      const { authMap, routes, menus } = ganerAuthData({ routes: asyncRoutes, permissions, authKey: 'permission' })
      // debugger
      accessedRoutes = routes
      // console.log(authMap)
      // console.log(routes)
      // console.log(menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

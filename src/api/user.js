import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/token/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/getUserInfo2',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

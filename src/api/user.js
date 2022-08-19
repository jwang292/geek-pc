import request from 'utils/request'
export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user/profile',
  })
}

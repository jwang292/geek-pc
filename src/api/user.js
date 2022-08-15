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

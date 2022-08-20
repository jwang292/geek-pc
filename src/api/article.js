import request from 'utils/request'

export const getArticles = (params) => {
  return request({
    url: '/mp/articles/:target',
    method: 'GET',
    params,
  })
}

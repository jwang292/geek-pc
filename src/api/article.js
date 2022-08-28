import request from 'utils/request'

export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params,
  })
}

export const delArticle = (id) => {
  return request.delete(`/mp/articles/${id}`)
}

export const addArticle = (data) => {
  return request.post('/mp/articles', data)
}

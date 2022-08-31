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

export const addArticle = (data, draft = false) => {
  return request.post(`/mp/articles?draft=${draft}`, data)
}
//获取文章详情信息
export const getArticleById = (id) => {
  return request.get(`/mp/articles/${id}`)
}

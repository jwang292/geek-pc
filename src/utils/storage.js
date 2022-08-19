// 封装所有localstorage 的操作

const TOKEN_KEY = 'token-geek-pc'
/**
 * saving token
 *@param {*} token
 *@return
 */

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * geting token
 *@return token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * MOVing token
 *@return
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * tesing  token
 *@return boolean
 */

export const hasToken = () => !!getToken()

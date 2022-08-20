import request from 'utils/request'
/**
 * 获取频道信息
 * @returns channels
 */
export function getChannels() {
  return request.get('/channels')
}

import request from '@/utils/request'

export function generator(data, tableName, entityName) {
  return request({
    url: 'api/generator',
    params: { tableName, entityName },
    data,
    method: 'post'
  })
}

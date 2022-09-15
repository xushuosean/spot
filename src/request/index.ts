import request from './request.config'

export function getData(str: string) {
  return request.get(`/search?wd=${str}`)
}
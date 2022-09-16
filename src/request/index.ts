import { ListItem } from '@/pages/BaseTypes';
import request from './request.config'

type SearchData = {
  hits: ListItem[]
}

export function getData(str: string): Promise<SearchData> {
  return request.get(`/search?wd=${str}`)
}
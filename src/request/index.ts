import { Groups } from './../pages/BaseTypes';
import { ListItem } from '@/pages/BaseTypes';
import request from './request.config'

export type SearchData = {
  hits: ListItem[],
  group: Groups
}

export function getData(str: string): Promise<SearchData> {
  return request.get(`/search?wd=${str}`)
}
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

export function getCellAndLine(): Promise<SearchData> {
  return request.get('/cellline')
}

export function getCellById(str: string): Promise<SearchData> {
  return request.get(`/getcell?id=${str}`)
}

export function getDiagramCell(id: string): Promise<SearchData> {
  return request.get(`/diagram?owner=${id}`)
}
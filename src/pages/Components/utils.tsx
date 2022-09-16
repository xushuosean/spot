import { message } from "antd"
import { ContentEnums, ContentType, ListItem } from "../BaseTypes"
import { Preivew, PreviewCell, PreviewDiagram, PreviewLine } from "./ContentCollection"

export const getChildren = (item: ListItem) => {
  if (Number(item.content.type) === ContentEnums.PREVIEW) {
    return <Preivew record={item} />
  } else if (Number(item.content.type) === ContentEnums.PREVIEW_CELL) {
    return <PreviewCell record={item} />
  } else if (Number(item.content.type) === ContentEnums.PREVIEW_DIAGRAM) {
    return <PreviewDiagram record={item} />
  } else if (Number(item.content.type) === ContentEnums.PREVIEW_LINE) {
    return <PreviewLine record={item} />
  }
  return null
}

export const getType = (type: string) => {
  if (type === 'cell') {
    return '图元'
  } else if (type === 'diagram') {
    return '视图'
  } else if (type === 'line') {
    return '线'
  }
  return ''
}


/** 导航 */
export const navigation = (record: ListItem) => {
  message.success(`action is: Navigation`)
}

/** 打开视图 */
export const openDiagram = (record: ListItem) => {
  message.success('action is: openDiagram')
}

/** 从知识库导入 */
export const importFromKnowledg = (record: ListItem) => {
  message.success('action is: importFromKnowledg')
}

/** 打开版本管理 */
export const openVersion = (record: ListItem) => {
  message.success('action is: openVersion')
}

/** 创建版本管理 */
export const createVersion = (record: ListItem) => {
  message.success('action is: createVersion')
}

/** 查看协同人员 */
export const viewCollaborate = (record: ListItem) => {
  message.success('action is: viewCollaborate')
}

/** 打开知识库 */
export const openKnowledgBase = (record: ListItem) => {
  message.success('action is: openKnowledgBase')
}

/** 关闭所有视图 */
export const closeAll = (record: ListItem) => {
  message.success('action is: closeAll')
}

/** 打开查找替换 */
export const find = (record: ListItem) => {
  message.success('action is: find')
}

/** 什么也不做 */
export const noneAction = (record: ListItem) => {
  message.success('action is: none')
}
import { message } from "antd"
import { createContext } from "react"
import { ContentEnums, ContentType, GroupType, ListItem } from "../BaseTypes"
import { Preivew, PreviewCell, PreviewDiagram, PreviewLine, PreviewShortcut } from "./ContentCollection"

export const getChildren = (item: ListItem) => {
  const numberType = Number(item.content.type)

  console.log(item.title, numberType, ContentEnums.PREVIEW_SHORTCUT)
  if (numberType === ContentEnums.PREVIEW) {
    return <Preivew record={item} />
  } else if (numberType === ContentEnums.PREVIEW_CELL) {
    return <PreviewCell record={item} />
  } else if (numberType === ContentEnums.PREVIEW_DIAGRAM) {
    return <PreviewDiagram record={item} />
  } else if (numberType === ContentEnums.PREVIEW_LINE) {
    return <PreviewLine record={item} />
  } else if (numberType === ContentEnums.PREVIEW_SHORTCUT) {
    console.log('here run short')
    return <PreviewShortcut record={item} />
  }
  return null
}

export const getGroupType = (type: GroupType) => {
  switch (type) {
    case GroupType.Knowledge:
      return '知识库'
    case GroupType.Related:
      return '相关功能'
    case GroupType.Shortcut:
      return '快捷键'
    default:
      return ''
  }
}

export const searchContext = createContext<{ searchValue: string }>({ searchValue: '' })

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
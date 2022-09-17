import { message, notification } from "antd"
import { createContext } from "react"
import { ContentEnums, ContentType, GroupType, ListItem } from "../BaseTypes"
import { Preivew, PreviewCell, PreviewDiagram, PreviewLine, PreviewShortcut } from "./ContentCollection"
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm'
import { PopModalProps } from "./Modal/type"

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
  const { ownerDiagramId, id } = record
  if (!ownerDiagramId) {
    message.warn('导航还需要ownerDiagramId')
    return
  }
  projectTreeViewModel.navigateToShape(ownerDiagramId, id);
  message.success(`action is: Navigation`)
}

/** 打开视图 */
export const openDiagram = (record: ListItem) => {
  projectTreeViewModel.openDiagram(record.id)
  message.success('action is: openDiagram')
}

/** 从知识库导入 */
export const importFromKnowledge = (record: ListItem) => {
  message.success('action is: importFromKnowledge')
}

/** 打开版本管理 */
export const openVersion = (record: ListItem) => {
  makeModalVisible({ title: '版本管理', content: '这是一个版本管理的弹窗。。。' })
  message.success('action is: openVersion')
}

/** 创建版本管理 */
export const createVersion = (record: ListItem) => {
  message.success('action is: createVersion')
}

/** 查看协同人员 */
export const viewCollaborate = (record: ListItem) => {
  makeModalVisible({ title: '协同人员', content: '这是一个协同人员的弹窗。。。' })
  message.success('action is: viewCollaborate')
}

/** 打开知识库 */
export const openKnowledgeBase = (record: ListItem) => {
  makeModalVisible({ title: '知识库', content: '这是一个知识库的弹窗。。。' })
  message.success('action is: openKnowledgeBase')
}

/** 关闭所有视图 */
export const closeAll = (record: ListItem) => {
  projectTreeViewModel.closeAllDiagrams();
  message.success('action is: closeAll')
}

/** 打开查找替换 */
export const find = (record: ListItem) => {
  makeModalVisible({ title: '查找替换', content: '这是一个查找替换的弹窗。。。' })
  message.success('action is: find')
}

/** 什么也不做 */
export const noneAction = (record: ListItem) => {
  message.success('action is: none')
}

const makeModalVisible = (props: PopModalProps) => {
  const { title, content } = props
  projectTreeViewModel.publishModalVisible({ title, content })
}
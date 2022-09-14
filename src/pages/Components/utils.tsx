import { message } from "antd"
import { ContentEnums, ContentType, ListItem } from "../BaseTypes"
import { Preivew, PreviewCell } from "./ContentCollection"

export const getChildren = (content: ContentType) => {
  if (content.type === ContentEnums.PREVIEW) {
    return <Preivew content={content} />
  } else if (content.type === ContentEnums.PREVIEW_CELL) {
    return <PreviewCell content={content} />
  }
  return null
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
export enum ComponentType {
  Description
}

export type ContentList = {
  title: string,
  type: ComponentType,
}

export type Guid = string;

/** 接口定义 */
export interface ListItem {
  title: string;
  content: ContentType;
  shiftExtra?: boolean;
  id: Guid;
  shiftExtraAction?: Actions;
  action: Actions;
}

export enum Actions {
  OPEN_DIAGRAM,    // 打开视图
  NONE,   // 无操作
  NAVIGATION,     // 导航
  IMPORT,   // 从知识库中导入
  OPEN_VERSION,
  CREATE_VERSION,
  VIEW_COLLABORATE,
  OPEN_KNOWLEDGEBASE,
  CLOSE_ALL,
}

export interface ContentType {
  type: ContentEnums;
  content: string | ContentInner;
}

export enum ContentEnums {
  PREVIEW,
  PREVIEW_CELL,
}

export type ContentInner = {
  cellId: Guid,
}
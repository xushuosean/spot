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
  group: Groups
  type: Types,
  desc?: string,
  canCreate?: string,
  createTime?: string,
  eidtTime?: string,
}

export enum Types {
  Cell = 'cell',
  Line = 'line',
  Find = 'find',
}

export enum Groups {
  None = 'none',
  Related = "related",
  Knowledge = 'knowledge'
}

/** 操作的类型，这里不要动顺序 */

export enum Actions {
  OPEN_DIAGRAM,    // 打开视图
  NONE,   // 无操作
  NAVIGATION,     // 导航
  IMPORT,   // 从知识库中导入
  OPEN_VERSION, // 打开版本
  CREATE_VERSION, // 创建版本
  VIEW_COLLABORATE, // 查看协同
  OPEN_KNOWLEDGEBASE, // 打开知识库
  CLOSE_ALL,  // 关闭所有视图
  FIND, // 查找替换
}

export interface ContentType {
  type: ContentEnums;
  content: string | ContentInner;
}

export enum ContentEnums {
  PREVIEW,
  PREVIEW_CELL,
  NONE
}

export type ContentInner = {
  cellId: Guid,
}
import { Actions, ContentEnums, ListItem } from "./BaseTypes"

export const getDataFaker = (key: string): ListItem[] => {
  if (key === 'zz') {
    const zzdw = {
      title: 'zzdw',
      content: {
        type: ContentEnums.PREVIEW,
        content: '这是zzdw',
      },
      id: getUuid(),
      action: Actions.NAVIGATION
    }

    const zzbd = {
      title: 'zzbd',
      content: {
        type: ContentEnums.PREVIEW_CELL,
        content: {
          cellId: 'node1'
        },
      },
      id: getUuid(),
      action: Actions.NAVIGATION
    }

    return [
      zzdw,
      zzbd
    ]
  }
  return []
}

export function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
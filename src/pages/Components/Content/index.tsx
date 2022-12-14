import { ContentType, ContentList, ContentEnums, ListItem, Actions, GroupType } from "@/pages/BaseTypes"
import ShortcutService from "@/pages/Services/ShortcutService"
import { List, Popover, Tabs } from "antd"
import React, { FC, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Preivew } from "../ContentCollection"
import { ContentWrapper } from "../ContentWrapper"
import { closeAll, createVersion, find, getChildren, getGroupType, importFromKnowledge, navigation, noneAction, openDiagram, openKnowledgeBase, searchContext, viewCollaborate } from "../utils"
import { LabelRender } from "./LabelRender"
import _ from 'lodash'

import styles from './index.less'
import { GroupTabs } from "../GroupTabs"

type ContentProps = {
  list: ListItem[],
  visible: boolean
}

const TabNodeWrapper = (node: React.ReactElement) => {
  return <div className={`${styles.tabNodeWrapper}`} style={{ width: '100%' }}>
    {node}
  </div>
}

export const Content: FC<ContentProps> = ({
  list,
  visible
}) => {
  const [key, setKey] = useState<string>('')

  const { searchValue } = useContext(searchContext)

  useEffect(() => {
    if (list && list.length > 0 && key === '') {
      const groupList = _.groupBy(list, (item) => item.group)
      if (groupList['none']) {
        setKey(groupList['none'][0].id)
      } else {
        const firstKey = Object.keys(groupList)[0]
        setKey(groupList[firstKey][0].id)
      }
    } else {
      setKey('')
    }
  }, [list])

  const keyRef = useRef(key)
  useEffect(() => {
    keyRef.current = key
  }, [key])

  useEffect(() => {
    const enter = ShortcutService.enter$.subscribe(() => {
      if (!visible) return
      const record = list.find(item => item.id === key)
      if (!record) return;
      const { action } = record
      switch (Number(action)) {
        case Actions.OPEN_DIAGRAM:
          openDiagram(record);
          break;
        case Actions.NONE:
          noneAction(record)
          break;
        case Actions.NAVIGATION:
          navigation(record)
          break;
        case Actions.IMPORT:
          importFromKnowledge(record)
          break;
        case Actions.OPEN_VERSION:
          navigation(record)
          break;
        case Actions.CREATE_VERSION:
          createVersion(record)
          break;
        case Actions.VIEW_COLLABORATE:
          viewCollaborate(record)
          break;
        case Actions.OPEN_KNOWLEDGEBASE:
          openKnowledgeBase(record)
          break;
        case Actions.CLOSE_ALL:
          closeAll(record)
          break;
        case Actions.FIND:
          find(record, searchValue)
          break;
        default:
          break;
      }

      ShortcutService.actionOver$.next(true)
    });

    return () => {
      enter.unsubscribe();
    }
  }, [key, visible])

  const sortList = useMemo(() => {
    const s = list.sort((a, b) => b.group.localeCompare(a.group))
    return s
  }, [list])

  const groupRender = (groupKey: string) => {
    const value = getGroupType(groupKey as GroupType)
    return value ? <div key={groupKey} className="groupLabel">{value}</div> : <></>
  }


  useEffect(() => {
    const activeItem = sortList.find(item => item.id === key)
    if (activeItem) {
      ShortcutService.iconChange$.next(activeItem)
    }

  }, [key])

  return (
    <GroupTabs
      activeKey={key}
      onChange={(activeKey) => {
        setKey(activeKey)
      }}
      groupKey={'group'}
      groupRender={groupRender}
      items={sortList.map(item => {
        return {
          key: item.id,
          label: <LabelRender record={item} />,
          group: item.group,
          children: (
            <ContentWrapper>
              {getChildren(item)}
            </ContentWrapper>
          )
        }
      })
      }
    />

  )
}

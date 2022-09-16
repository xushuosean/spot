import { ContentType, ContentList, ContentEnums, ListItem, Actions } from "@/pages/BaseTypes"
import ShortcutService from "@/pages/Services/ShortcutService"
import { List, Popover, Tabs } from "antd"
import { FC, useEffect, useRef, useState } from "react"
import { Preivew } from "../ContentCollection"
import { ContentWrapper } from "../ContentWrapper"
import { closeAll, createVersion, find, getChildren, importFromKnowledg, navigation, noneAction, openDiagram, openKnowledgBase, viewCollaborate } from "../utils"

type ContentProps = {
  list: ListItem[]
}

export const Content: FC<ContentProps> = ({
  list
}) => {
  const [key, setKey] = useState<string>('')

  useEffect(() => {
    if (list && list.length > 0 && key === '') {
      setKey(list[0].id)
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
      const record = list.find(item => item.id === key)
      if (!record) return;
      const { action } = record
      console.log(action)
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
          importFromKnowledg(record)
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
          openKnowledgBase(record)
          break;
        case Actions.CLOSE_ALL:
          closeAll(record)
          break;
        case Actions.FIND:
          find(record)
          break;
        default:
          break;
      }
      // console.log(key)
    });

    return () => {
      enter.unsubscribe();
    }
  }, [key])

  return (
    <Tabs
      tabPosition="left"
      activeKey={key}
      onChange={(activeKey) => {
        setKey(activeKey)
      }}
      items={list.map(item => {
        console.log(Number(item.content.type))
        return {
          key: item.id,
          label: <div>
            {item.title}
          </div>,
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

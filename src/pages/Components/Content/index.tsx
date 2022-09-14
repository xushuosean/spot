import { ContentType, ContentList, ContentEnums, ListItem, Actions } from "@/pages/BaseTypes"
import ShortcutService from "@/pages/Services/ShortcutService"
import { Tabs } from "antd"
import { FC, useEffect, useRef, useState } from "react"
import { Preivew } from "../ContentCollection"
import { ContentWrapper } from "../ContentWrapper"
import { getChildren, navigation } from "../utils"

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
    console.log(key)
  }, [key])
  // const next = () => {
  //   const index = list.findIndex(item => item.title === keyRef.current)
  //   const isLast = index === list.length - 1
  //   if (index !== -1 && !isLast) {

  //     setKey(list[index + 1].title)
  //   }
  // }

  // const prev = () => {
  //   const index = list.findIndex(item => item.title === keyRef.current)
  //   const isFirst = index === 0
  //   if (index !== -1 && !isFirst) {
  //     console.log(key, list[index - 1].title)
  //     setKey(list[index - 1].title)
  //   }
  // }

  // useEffect(() => {
  //   const arrowUp = ShortcutService.arrowUp$.subscribe(() => {
  //     prev()
  //   })

  //   const arrowDown = ShortcutService.arrowDown$.subscribe(() => {
  //     next()
  //   })

  //   return () => {
  //     arrowUp.unsubscribe();
  //     arrowDown.unsubscribe();
  //   }
  // }, [])

  useEffect(() => {
    const enter = ShortcutService.enter$.subscribe(() => {
      const record = list.find(item => item.id === key)
      if (!record) return;
      console.log(record)
      const { action } = record
      switch (action) {
        case Actions.NAVIGATION:
          navigation(record)
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
        return {
          key: item.id,
          label: <div>
            {item.title}
          </div>,
          children: (
            <ContentWrapper>
              {getChildren(item.content)}
            </ContentWrapper>
          )
        }
      })
      }
    />
  )
}

import React, { FC, useEffect, useMemo, useRef } from "react"
import { GroupTab } from "."
import _ from 'lodash'
import styles from './index.less'
import ShortcutService from "@/pages/Services/ShortcutService"
import { merge } from "rxjs"
import { map } from 'rxjs/operators'

type NavListProps = {
  activeKey: string,
  onChange: (activeKey: string) => void,
  items: GroupTab[],
  groupKey?: string,
  groupRender?: (groupKey: string) => JSX.Element
}

type TabNodeProps = {
  label: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const TabNode: FC<TabNodeProps> = ({ label, isActive, onClick }) => {
  return <div onClick={onClick} className={`${styles.tabNode} ${isActive ? styles.activeNode : ''}`}>{
    label
  }</div>
}

export const NavList: FC<NavListProps> = ({
  activeKey,
  onChange,
  items,
  groupKey,
  groupRender
}) => {

  const onTabNodeClick = (key: string) => {
    onChange(key)
  }

  const groupsItems = useMemo(() => {
    return _.groupBy(items, (item) => item.group)
  }, [items])

  const keys = useMemo(() => {
    const gks = Object.keys(groupsItems)
    const noneIndex = gks.findIndex((gk) => gk === 'none')
    if (noneIndex !== -1) {
      if (noneIndex !== 0) {
        const temp = gks[0]
        gks[0] = gks[noneIndex]
        gks[noneIndex] = temp
      }
    }

    return gks
  }, [groupsItems])

  const idLists = useMemo(() => {
    const list = keys.map(key => {
      const item = groupsItems[key]
      return item.map(it => {
        return it.key
      })
    })

    return _.flatMapDeep(list)
  }, [groupsItems, keys])

  const activeKeyRef = useRef<string>(activeKey)
  useEffect(() => {
    activeKeyRef.current = activeKey
  }, [activeKey])

  useEffect(() => {

    const arrow = merge(
      ShortcutService.arrowUp$.pipe(map(() => -1)),
      ShortcutService.arrowDown$.pipe(map(() => 1))
    ).subscribe((value) => {
      const index = idLists.findIndex((id) => id === activeKey)
      if (index !== -1) {
        const resolveKeyIndex = index + value
        if (resolveKeyIndex <= 0) {
          onChange(idLists[0])
        } else if (resolveKeyIndex >= idLists.length - 1) {
          onChange(idLists[idLists.length - 1])
        } else {
          onChange(idLists[resolveKeyIndex])
        }
      }
    })

    return () => {
      arrow.unsubscribe();
    }
  }, [idLists])


  return <>
    {
      groupKey ?
        (
          <div className={styles.tabNavList}>
            {
              keys.map(key => {
                const groupItem = groupsItems[key]
                return (
                  <>
                    {
                      groupRender && groupRender(key)
                    }
                    {
                      groupItem.map(gr => {
                        return <TabNode onClick={() => {
                          onTabNodeClick(gr.key)
                        }} key={gr.key} isActive={(() => {
                          console.log(activeKey, gr.key)
                          return activeKey === gr.key
                        })()} label={gr.label} />
                      })
                    }
                  </>
                )
              })
            }
          </div>
        ) :
        (
          <div className={styles.tabNavList}>
            {
              items.map(item => {
                return <TabNode onClick={() => {
                  onTabNodeClick(item.key)
                }} key={item.key} isActive={(() => {
                  console.log(activeKey, item.key)
                  return activeKey === item.key
                })()} label={item.label} />
              })
            }
          </div>
        )
    }
  </>
}
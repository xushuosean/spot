import React, { FC, useMemo } from "react"
import { GroupTab } from "."
import _ from 'lodash'
import styles from './index.less'

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
                        }} key={gr.key} isActive={activeKey === gr.key} label={gr.label} />
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
                }} key={item.key} isActive={activeKey === item.key} label={item.label} />
              })
            }
          </div>
        )
    }
  </>
}
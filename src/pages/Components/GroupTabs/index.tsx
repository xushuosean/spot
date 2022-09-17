import { FC } from "react"
import { GroupTabPane } from "./GroupTabPane"
import styles from './index.less'
import { NavList } from "./NavList"

type GroupTabsProps = {
  activeKey: string,
  onChange: (activeKey: string) => void,
  items: GroupTab[],
  groupKey?: string,
  groupRender?: (groupKey: string) => JSX.Element
}

export type GroupTab = {
  key: string,
  label: React.ReactNode,
  group: string,
  children: JSX.Element
}

export const GroupTabs: FC<GroupTabsProps> = ({
  activeKey,
  onChange,
  items = [],
  groupKey,
  groupRender
}) => {
  return <>
    {
      items.length > 0 && (
        <div className={styles.groupTabs}>
          <NavList groupKey={groupKey} groupRender={groupRender} activeKey={activeKey} onChange={onChange} items={items} />
          <GroupTabPane activeKey={activeKey} items={items} />
        </div>
      )
    }
  </>
}
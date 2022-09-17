import { FC, useMemo } from "react"
import { GroupTab } from "."

type GroupTabPaneProps = {
  activeKey: string,
  items: GroupTab[],
}

export const GroupTabPane: FC<GroupTabPaneProps> = ({
  activeKey,
  items
}) => {
  const comp = useMemo(() => {
    const item = items?.find(it => it.key === activeKey)
    if (item) return item
    return null
  }, [items, activeKey])
  return <>
    {
      comp && comp.children
    }
  </>
}
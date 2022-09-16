import { ListItem } from "@/pages/BaseTypes"
import { Tabs } from "antd"
import { FC } from "react"
import { ContentWrapper } from "../ContentWrapper"
import { getChildren } from "../utils"

type SubContentProps = {
  key: string,
  setKey: React.Dispatch<React.SetStateAction<string>>,
  list: ListItem[]
}

export const SubContent: FC<SubContentProps> = ({ key, setKey, list }) => {
  console.log(list)
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
              {getChildren(item)}
            </ContentWrapper>
          )
        }
      })
      }
    />
  )
}
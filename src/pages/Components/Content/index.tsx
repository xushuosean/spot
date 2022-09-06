import { ContentList } from "@/pages/BaseTypes"
import ShortcutService from "@/pages/Services/ShortcutService"
import { Tabs } from "antd"
import { FC, useEffect, useState } from "react"

const TabPane = Tabs.TabPane

type ContentProps = {
  list: ContentList[]
}

export const Content: FC<ContentProps> = ({
  list
}) => {
  const [key, setKey] = useState<string>(list[0].title)

  return (
    <Tabs
      style={{ background: '#fff' }}
      tabPosition="left"
      items={list.map(item => {
        return {
          label: item.title,
          key: item.title,
          children: (
            <div className="contentBox">
              <i className="iconImage">&#xe9d6;</i>
              <h1>zzbd {item.title}</h1>
              <h4 style={{ wordBreak: 'break-all' }}>here is description dafdsjfa;sdjfjldsf oijdalfjsdkfljoasijdflkja;lskdjoasdmlkjd;lfjaldkj </h4>
            </div>
          )
        }
      })
      }
    />
  )
}

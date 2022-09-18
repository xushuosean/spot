import { ListItem, Types } from "@/pages/BaseTypes"
import { FC, useContext } from "react"
import { getIcon, getType, searchContext } from "../utils"
import { cellIcon, diagramIcon, findIcon, lineIcon, rightIcon } from "./icon"
import { RightOutlined } from '@ant-design/icons'

import styles from './index.less'

type LabelRenderProps = {
  record: ListItem
}

const highlightText = (content: string, keyword: string) => {
  const regx = new RegExp(keyword, 'gi')
  const val = `<span class="highlightText" style="background-color: #B5D7FF">${keyword}</span>`
  return content.replace(regx, val)
}

export const LabelRender: FC<LabelRenderProps> = ({ record }) => {

  const { searchValue } = useContext(searchContext)



  return <div className={styles.labelRender}>
    <img src={getIcon(record.type)} alt="" />
    <div className={styles.label}>
      <span dangerouslySetInnerHTML={{ __html: highlightText(record.title, searchValue) }}></span>
      {
        getType(record.type) && (
          <span>
            - {getType(record.type)}
          </span>
        )
      }
      {
        record.createTime && (
          <span>
            · {record.createTime}
          </span>
        )
      }
    </div>
    <div className={styles.right}>
      <img src={rightIcon} />
    </div>
  </div>
}
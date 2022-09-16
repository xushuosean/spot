import { ListItem } from "@/pages/BaseTypes"
import { Tag } from "antd"
import { FC, useMemo } from "react"

import styles from './index.less'

type PreviewShortcutProps = {
  record: ListItem
}

export const PreviewShortcut: FC<PreviewShortcutProps> = ({
  record
}) => {
  const keys = useMemo(() => {
    console.log(record)
    return record?.keyCode?.split('+')
  }, [record])
  return (
    <div className={styles.previewShortcutContainer}>
      {
        keys && keys?.map(key => {
          return <Tag key={key} color="processing">{key}</Tag>
        })
      }
    </div>
  )
}
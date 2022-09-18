import { ListItem } from "@/pages/BaseTypes"
import { useIcon } from "@/pages/hooks"
import { Avatar } from "antd"
import { FC } from "react"
import styles from './index.less'

type PreviewCollaborateProps = {
  record: ListItem
}

export const PreviewCollaborate: FC<PreviewCollaborateProps> = ({
  record
}) => {
  const icon = useIcon(record.type)

  return <div className={styles.collaborateBox}>
    <div className={styles.iconBox}>
      <img src={icon} />
    </div>
    <div className={styles.avatarBox}>
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>A</Avatar>
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>B</Avatar>
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>C</Avatar>
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>D</Avatar>
    </div>
  </div>
}
import { ListItem } from "@/pages/BaseTypes"
import { useIcon } from "@/pages/hooks"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons'
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
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<UserOutlined />}>A</Avatar>
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<UserOutlined />}>B</Avatar>
      <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<UserOutlined />}>C</Avatar>
      <Avatar size='large' icon={<UserOutlined />}>D</Avatar>
    </div>
  </div>
}
import { FC } from "react"
import { getType } from "../../utils"
import { PreviewCellProps } from "../PreviewCell"
import styles from './index.less'

type TopTitleProps = PreviewCellProps

export const TopTitle: FC<TopTitleProps> = ({
  record
}) => {
  return <div className={styles.titleBox}>
    <div className={styles.title}>{record.title}</div>
    —
    <div className={styles.cellType}>{getType(record.type)}</div>
  </div>
}
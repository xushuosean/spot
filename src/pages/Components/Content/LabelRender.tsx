import { ListItem } from "@/pages/BaseTypes"
import { FC } from "react"
import cellIcon from '@/assets/cellicon.svg'

type LabelRenderProps = {
  record: ListItem
}

export const LabelRender: FC<LabelRenderProps> = ({ record }) => {
  return <div>
    <img src={cellIcon} alt="图元icon" />
    {record.title}
  </div>
}
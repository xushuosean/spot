import { ContentType, ListItem } from "@/pages/BaseTypes"
import { FC } from "react"

type PreviewProps = {
  record: ListItem
}
export const Preivew: FC<PreviewProps> = ({
  record
}) => {
  return <>{record.title}</>
}
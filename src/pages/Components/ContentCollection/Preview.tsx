import { ContentType } from "@/pages/BaseTypes"
import { FC } from "react"

type PreviewProps = {
  content: ContentType
}
export const Preivew: FC<PreviewProps> = ({
  content
}) => {
  return <>{content.content}</>
}
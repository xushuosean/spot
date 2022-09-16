import { ContentInner, ContentType } from "@/pages/BaseTypes"
import GraphicService from "@/pages/Services/GraphicService"
import { Graph, Shape } from "@antv/x6"
import { FC, useEffect, useRef } from "react"

type PreviewCellProps = {
  content: ContentType
}

export const PreviewCell: FC<PreviewCellProps> = ({
  content
}) => {
  const cellRef = useRef<HTMLDivElement>(null)
  const graphicService = new GraphicService();
  const cell = graphicService.getGraph()?.getCellById((content.content as ContentInner).cellId)
  useEffect(() => {
    if (!cellRef.current) return;
    const graph = new Graph({
      container: cellRef.current,

      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })

    console.log(cell)

    if (cell)
      graph.addNode(cell?.toJSON())
  }, [])

  return <div style={{ height: '100%', width: '100%' }} ref={cellRef}>

  </div>
}
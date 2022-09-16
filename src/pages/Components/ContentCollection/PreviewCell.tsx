import { ContentInner, ContentType, ListItem } from "@/pages/BaseTypes"
import Graphic from "@/pages/Graphic"
import { Graph, Shape } from "@antv/x6"
import { FC, useEffect, useRef } from "react"
import { getType } from "../utils"
import './index.less'

type PreviewCellProps = {
  record: ListItem
}

export const PreviewCell: FC<PreviewCellProps> = ({
  record
}) => {
  const cellRef = useRef<HTMLDivElement>(null)

  console.log(record)

  const cell = Graphic.getGraph()?.getCellById((record.content.content as ContentInner).cellId)
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

  return <div className="previewCellContainer">
    <div className="contentContainer">
      <div className="textContainer">
        <div className="titleBox">
          <div className="title">{record.title}</div>
          —
          <div className="cellType">{getType(record.type)}</div>
        </div>
        <div className="desc">{record.desc}</div>
        <div className="createDiagram">可在<span className="createDiagramName">{record.canCreate}</span>中创建</div>

        <div className="timeBox">
          <div className="time">创建时间：{record.createTime}</div>
          <div className="time">修改时间：{record.eidtTime}</div>
        </div>
      </div>
      <div style={{ height: '100%', width: '45%' }} className="grpah" ref={cellRef}></div>
    </div>
    <div className="navigation">
      该图元存在：
      <div>dafsd</div>
      <div>dfasdfasd</div>
    </div>
  </div>
}
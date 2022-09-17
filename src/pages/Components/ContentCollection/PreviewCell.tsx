import { ContentInner, ContentType, ListItem } from "@/pages/BaseTypes"
import GraphicService from "@/pages/Services/GraphicService"
import { Graph, Shape } from "@antv/x6"
import { FC, useEffect, useRef } from "react"
import { getType } from "../utils"
import styles from './index.less'
import { TopTitle } from "./TopTitle"

export type PreviewCellProps = {
  record: ListItem
}

export const PreviewCell: FC<PreviewCellProps> = ({
  record
}) => {
  const cellRef = useRef<HTMLDivElement>(null)
  const graphicService = new GraphicService();
  const cell = graphicService.getGraph()?.getCellById((record.content.content as ContentInner).cellId)
  useEffect(() => {
    if (!cellRef.current) return;
    const graph = new Graph({
      container: cellRef.current,

      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })

    if (cell)
      graph.addNode(cell?.toJSON())
  }, [])

  return <div className={styles.previewCellContainer}>
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <TopTitle record={record} />
        <div className={styles.desc}>{record.desc}</div>
        <div className={styles.createDiagram}>可在<span className={styles.createDiagramName}>{record.canCreate}</span>中创建</div>

        <div className={styles.timeBox}>
          <div className={styles.time}>创建时间：{record.createTime}</div>
          <div className={styles.time}>修改时间：{record.eidtTime}</div>
        </div>
      </div>
      <div style={{ height: '100%', width: '45%' }} className="grpah" ref={cellRef}></div>
    </div>
    <div className={styles.navigation}>
      该图元存在：
      <div>dafsd</div>
      <div>dfasdfasd</div>
    </div>
  </div>
}
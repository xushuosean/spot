import { ListItem, Types } from "@/pages/BaseTypes"
import { getDiagramCell } from "@/request"
import { Graph } from "@antv/x6"
import { FC, useEffect, useRef } from "react"
import { getType } from "../../utils"
import { TopTitle } from "../TopTitle"
import styles from './index.less'

type PreviewDiagramProps = {
  record: ListItem
}

export const PreviewDiagram: FC<PreviewDiagramProps> = ({
  record
}) => {
  const cellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      if (!cellRef.current) return;
      const graph = new Graph({
        container: cellRef.current,

        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
      })

      const diagramId = record.id
      const cells = await getDiagramCell(diagramId);
      const blocks = cells.hits.filter(cell => cell.type === Types.Cell)
      const lines = cells.hits.filter(cell => cell.type === Types.Line)

      blocks.forEach(block => {
        graph.addNode(block.value)
      })

      lines.forEach(line => {
        const source = graph.getCellById(line.value.source)
        const target = graph.getCellById(line.value.target)
        graph.addEdge({
          source,
          target
        })
      })

      graph.centerContent()
    })()

  }, [record])

  return <div className={styles.previewDiagramContainer}>
    <TopTitle record={record} />
    <div className={styles.desc}>
      {record.desc}
    </div>

    <div style={{ height: '60%', width: '100%' }} ref={cellRef}></div>

    <div className={styles.timeBox}>
      <div className={styles.time}>创建时间：{record.createTime}</div>
      <div className={styles.time}>修改时间：{record.eidtTime}</div>
    </div>
  </div>
}
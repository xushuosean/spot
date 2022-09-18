import { getCellById } from "@/request"
import { EdgeView, Graph, Vector } from "@antv/x6"
import { FC, useEffect, useRef } from "react"
import { PreviewCellProps } from "../PreviewCell"
import { TopTitle } from "../TopTitle"

import styles from './index.less'

type PreviewLineProps = PreviewCellProps

export const PreviewLine: FC<PreviewLineProps> = ({ record }) => {
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      if (!graphRef.current) return;
      const graph = new Graph({
        container: graphRef.current,
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
      })

      const { value } = record
      console.log(value)
      if (value) {
        const { source, target, id } = value
        const sourceData = await getCellById(source)
        const targetData = await getCellById(target)

        console.log(sourceData, targetData)

        const sourceCell = sourceData.hits[0].value
        const targetCell = targetData.hits[0].value

        const sourceNode = graph.addNode(sourceCell)
        const targetNode = graph.addNode(targetCell)

        const edge = graph.addEdge({
          source: sourceNode,
          target: targetNode
        })



        graph.centerCell(graph.getCellById(edge.id))

        const view = graph.findViewByCell(edge) as EdgeView;

        const token = Vector.create('circle', { r: 6, fill: 'green' })
        view.sendToken(token.node, { duration: 1000, pause: 1000, repeatCount: 'indefinite' })

      }

    })()
  }, [record])
  return <div className={styles.previewLineContainer}>
    <TopTitle record={record} />
    <div className={styles.desc} dangerouslySetInnerHTML={{ __html: record.desc ?? '' }}>

    </div>
    <div style={{ width: '100%', height: '70%' }} ref={graphRef}></div>

    <div className={styles.timeBox}>
      <div className={styles.time}>创建时间：{record.createTime}</div>
      <div className={styles.time}>修改时间：{record.eidtTime}</div>
    </div>
  </div >
}
import { EdgeView, Graph, Vector } from "@antv/x6"
import { FC, useEffect, useRef } from "react"
import { PreviewCellProps } from "../PreviewCell"
import { TopTitle } from "../TopTitle"

import styles from './index.less'

type PreviewLineProps = PreviewCellProps

export const PreviewLine: FC<PreviewLineProps> = ({ record }) => {
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!graphRef.current) return;
    const graph = new Graph({
      container: graphRef.current,
      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })

    const a = graph.addNode({
      x: 50,
      y: 50,
      width: 100,
      height: 40,
      label: 'A',
    })

    const b = graph.addNode({
      x: 250,
      y: 50,
      width: 100,
      height: 40,
      label: 'B',
    })

    const edge = graph.addEdge({
      source: a,
      target: b,
    })

    const view = graph.findViewByCell(edge) as EdgeView;

    const token = Vector.create('circle', { r: 6, fill: 'green' })
    view.sendToken(token.node, { duration: 1000, pause: 1000, repeatCount: 'indefinite' })


  }, [])
  return <div className={styles.previewLineContainer}>
    <TopTitle record={record} />
    <div className={styles.desc} dangerouslySetInnerHTML={{ __html: record.desc ?? '' }}>

    </div>
    <div style={{ width: '100%', height: '50%' }} ref={graphRef}></div>

    <div className={styles.timeBox}>
      <div className={styles.time}>创建时间：{record.createTime}</div>
      <div className={styles.time}>修改时间：{record.eidtTime}</div>
    </div>
  </div >
}
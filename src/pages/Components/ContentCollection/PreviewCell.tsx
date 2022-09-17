import { ContentInner, ContentType, ListItem } from "@/pages/BaseTypes"
import GraphicService from "@/pages/Services/GraphicService"
import { Graph, Shape } from "@antv/x6"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import { getType } from "../utils"
import styles from './index.less'
import init, { getData as getDiagramData } from "wasm-lib";
import { TopTitle } from "./TopTitle"
import { DiagramData } from "../Diagrams/type"
import { Diagram } from "../Diagrams/vm"

export type PreviewCellProps = {
  record: ListItem
}

export const PreviewCell: FC<PreviewCellProps> = ({
  record
}) => {
  const cellRef = useRef<HTMLDivElement>(null)
  const graphicService = new GraphicService();
  console.log(record)
  useEffect(() => {
    const cell = graphicService.getGraph()?.getCellById((record.content.content as ContentInner).cellId)
    if (!cellRef.current) return;
    const graph = new Graph({
      container: cellRef.current,

      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })

    const { value } = record
    if (value) {
      graph.addNode(value)
      const cell = graph.getCellById(value.id)
      graph.centerCell(cell)
    }
  }, [record])

  const [ownerDiagram, setOwnerDiagram] = useState<Diagram>()

  useEffect(() => {
    (async () => {
      await init()
      const initData = getDiagramData() as DiagramData;
      // getDiagramData().then((initData: DiagramData) => {
      //   const diagram = initData.diagrams.find(item => item.id === record.ownerDiagramId)
      //   setOwnerDiagram(diagram)
      //   console.log(diagram)
      // })
      const diagram = initData.diagrams.find(item => item.id === record.ownerDiagramId)
      setOwnerDiagram(diagram)
      console.log(diagram)
    })()
  }, [record])


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
      <div>{ownerDiagram?.label}</div>
    </div>
  </div>
}
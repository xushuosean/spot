import { useRef, useEffect, FC } from "react";
import GraphicService, { GraphData } from "../Services/GraphicService";
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm'

type GraphicProps = {
    data: GraphData
}
/** 视图组件 */
const Graphic: FC<GraphicProps> = ({ data }) => {
    const container = useRef<HTMLDivElement>(null);
    const graphicRef = useRef<GraphicService>(new GraphicService())

    useEffect(() => {
        if (!container.current) return
        graphicRef.current.createCanvas(container.current, data)
        if (projectTreeViewModel.navigateShapeId) graphicRef.current.selectCell(projectTreeViewModel.navigateShapeId)
        return () => {
            graphicRef.current?.dispose()
        }
    }, [])

    return <div style={{ height: '100%', width: '100%' }} className='ddd' ref={container} />
}

export default Graphic
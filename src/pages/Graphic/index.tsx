import { useRef, useEffect, FC } from "react";
import GraphicService, { GraphData } from "../Services/GraphicService";

type Graphic = {
    data: GraphData
}
/** 视图组件 */
const Graphic: FC<Graphic> = ({ data }) => {
    const container = useRef<HTMLDivElement>(null);
    const Graphic = new GraphicService();

    useEffect(() => {
        if (container.current && Graphic) Graphic.createCanvas(container.current, data)
    }, [])

    return <div style={{ height: '100%', width: '100%' }} className='ddd' ref={container} />
}

export default Graphic
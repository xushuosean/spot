import { message, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm';
import styles from '@/pages/Components/Diagrams/index.less'
import init, { getData as getDiagramData } from "wasm-lib";
import { getCellAndLine } from '@/request';
import { ListItem, Types } from '@/pages/BaseTypes';
import Graphic from '@/pages/Graphic';
import { GraphData } from '@/pages/Services/GraphicService';
import { ShapeData, DiagramData, Diagram } from './type';



const App: React.FC = () => {
    const diagramData = useRef<Diagram[]>([])
    const [activeKey, setActiveKey] = useState<string>();
    const [openingDiagrams, setOpeningDiagrams] = useState<Diagram[]>([]);

    const generateNode = (c: ListItem) => {
        return {
            id: c.value.id,
            x: c.value.x,
            y: c.value.y,
            width: c.value.width,
            height: c.value.height,
            label: c.value.label,
        }

    }

    const generateLine = (c: ListItem) => {
        return {
            source: c.value.source, // String，必须，起始节点 id
            target: c.value.target, // String，必须，目标节点 id
        }
    }

    // const allDiagramData = useMemo(() => {
    //     let diagramData: Diagram[] = [];
    //     (async () => {
    //         // webassembly 数据初始化
    //         await init()
    //         const initData = await getDiagramData() as DiagramData
    //         console.log('7878initData', initData);

    //         // milisearch 图元初始化
    //         // const allShape = await getCellAndLine() as ShapeData;
    //         const allShape: ShapeData = {
    //             "hits": [
    //                 {
    //                     "title": "作战单位61",
    //                     "id": "42",
    //                     "type": "cell",
    //                     "action": "3",
    //                     "contentType": "0",
    //                     "group": "knowledge",
    //                     "createTime": "2022/09/15"
    //                 },
    //                 {
    //                     "title": "使命任务1",
    //                     "desc": "这里是使命任务图元的描述信息",
    //                     "id": "bac0b16e-4d1a-489b-8a27-438f409ea6a2",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "1",
    //                     "value": {
    //                         "id": "bac0b16e-4d1a-489b-8a27-438f409ea6a2",
    //                         "x": 40,
    //                         "y": 40,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "使命任务1"
    //                     }
    //                 },
    //                 {
    //                     "title": "依赖关系线1",
    //                     "desc": "这里是关系线图元的描述信息",
    //                     "id": "d7a021cf-821d-4162-bd39-5a7932c20562",
    //                     "type": "line",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "1",
    //                     "value": {
    //                         "id": "d7a021cf-821d-4162-bd39-5a7932c20562",
    //                         "source": "142a0576-45bd-4f85-ae4a-6de443435cb1",
    //                         "target": "bac0b16e-4d1a-489b-8a27-438f409ea6a2"
    //                     }
    //                 },
    //                 {
    //                     "title": "作战单位2",
    //                     "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
    //                     "id": "2ce6d195-81df-45a1-83da-0f5d569c2d4b",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "2",
    //                     "value": {
    //                         "id": "2ce6d195-81df-45a1-83da-0f5d569c2d4b",
    //                         "x": 140,
    //                         "y": 240,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "作战单位2"
    //                     }
    //                 },
    //                 {
    //                     "title": "使命任务2",
    //                     "desc": "这里是使命任务图元的描述信息",
    //                     "id": "0a432281-02f7-427e-958d-e80c7c9429cd",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "2",
    //                     "value": {
    //                         "id": "0a432281-02f7-427e-958d-e80c7c9429cd",
    //                         "x": 140,
    //                         "y": 40,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "使命任务2"
    //                     }
    //                 },
    //                 {
    //                     "title": "依赖关系线2",
    //                     "desc": "这里是关系线图元的描述信息",
    //                     "id": "3a3c9216-378b-49de-a4f9-6803cf168eb3",
    //                     "type": "line",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "2",
    //                     "value": {
    //                         "id": "3a3c9216-378b-49de-a4f9-6803cf168eb3",
    //                         "source": "2ce6d195-81df-45a1-83da-0f5d569c2d4b",
    //                         "target": "0a432281-02f7-427e-958d-e80c7c9429cd"
    //                     }
    //                 },
    //                 {
    //                     "title": "作战单位3",
    //                     "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
    //                     "id": "d9f94695-adba-4655-a8fe-4283871d27a1",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "3",
    //                     "value": {
    //                         "id": "d9f94695-adba-4655-a8fe-4283871d27a1",
    //                         "x": 40,
    //                         "y": 240,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "作战单位3"
    //                     }
    //                 },
    //                 {
    //                     "title": "使命任务3",
    //                     "desc": "这里是使命任务图元的描述信息",
    //                     "id": "398e0c92-2515-42aa-9aa4-ec6d679f33a5",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "3",
    //                     "value": {
    //                         "id": "398e0c92-2515-42aa-9aa4-ec6d679f33a5",
    //                         "x": 40,
    //                         "y": 40,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "使命任务3"
    //                     }
    //                 },
    //                 {
    //                     "title": "依赖关系线3",
    //                     "desc": "这里是关系线图元的描述信息",
    //                     "id": "3e738229-668c-4f65-a721-34a69616c6b3",
    //                     "type": "line",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "3",
    //                     "value": {
    //                         "id": "3e738229-668c-4f65-a721-34a69616c6b3",
    //                         "source": "d9f94695-adba-4655-a8fe-4283871d27a1",
    //                         "target": "398e0c92-2515-42aa-9aa4-ec6d679f33a5"
    //                     }
    //                 },
    //                 {
    //                     "title": "作战单位4",
    //                     "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
    //                     "id": "f6d25121-f062-499c-bc02-1ce533e0520b",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "4",
    //                     "value": {
    //                         "id": "f6d25121-f062-499c-bc02-1ce533e0520b",
    //                         "x": 40,
    //                         "y": 140,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "作战单位4"
    //                     }
    //                 },
    //                 {
    //                     "title": "使命任务4",
    //                     "desc": "这里是使命任务图元的描述信息",
    //                     "id": "eed8d38b-eb84-49f1-9f4b-705678a20e8b",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "4",
    //                     "value": {
    //                         "id": "eed8d38b-eb84-49f1-9f4b-705678a20e8b",
    //                         "x": 40,
    //                         "y": 40,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "使命任务4"
    //                     }
    //                 },
    //                 {
    //                     "title": "依赖关系线1",
    //                     "desc": "这里是关系线图元的描述信息",
    //                     "id": "8ac33417-467d-441d-8b1c-99bee90c3c2f",
    //                     "type": "line",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "4",
    //                     "value": {
    //                         "id": "8ac33417-467d-441d-8b1c-99bee90c3c2f",
    //                         "source": "f6d25121-f062-499c-bc02-1ce533e0520b",
    //                         "target": "eed8d38b-eb84-49f1-9f4b-705678a20e8b"
    //                     }
    //                 },
    //                 {
    //                     "title": "作战单位6",
    //                     "id": "4",
    //                     "type": "cell",
    //                     "action": "3",
    //                     "contentType": "0",
    //                     "group": "knowledge",
    //                     "createTime": "2022/09/15"
    //                 },
    //                 {
    //                     "title": "作战单位7",
    //                     "id": "5",
    //                     "type": "cell",
    //                     "action": "3",
    //                     "contentType": "0",
    //                     "group": "knowledge",
    //                     "createTime": "2022/09/15"
    //                 },
    //                 {
    //                     "title": "作战单位连接线",
    //                     "desc": "连接不同的作战单位。<br />from：作战单位<br />to：作战单位",
    //                     "id": "7",
    //                     "type": "line",
    //                     "action": "1",
    //                     "contentType": "4",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16"
    //                 },
    //                 {
    //                     "title": "作战单位1",
    //                     "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
    //                     "id": "142a0576-45bd-4f85-ae4a-6de443435cb1",
    //                     "type": "cell",
    //                     "action": "1",
    //                     "contentType": "1",
    //                     "group": "none",
    //                     "createTime": "2022/09/15",
    //                     "eidtTime": "2022/09/16",
    //                     "canCreate": "OV-1_高层作战概念视图",
    //                     "ownerDiagramId": "1",
    //                     "value": {
    //                         "id": "142a0576-45bd-4f85-ae4a-6de443435cb1",
    //                         "x": 140,
    //                         "y": 240,
    //                         "width": 80,
    //                         "height": 40,
    //                         "label": "作战单位1"
    //                     }
    //                 }
    //             ],
    //             "estimatedTotalHits": 16,
    //             "query": "",
    //             "limit": 1000,
    //             "offset": 0,
    //             "processingTimeMs": 0
    //         }
    //         const cell = allShape?.hits?.filter(c => c.ownerDiagramId && c.type === Types.Cell)
    //         const line = allShape?.hits?.filter(c => c.ownerDiagramId && c.type === Types.Line)

    //         // 恢复视图数据
    //         const { diagrams } = initData
    //         diagrams.forEach(d => {
    //             const data: GraphData = {
    //                 nodes: cell.filter(c => c.ownerDiagramId === d.key).map(c => generateNode(c)),
    //                 edges: line.filter(l => l.ownerDiagramId === d.key).map(l => generateLine(l))
    //             }
    //             d.data = data;
    //             d.children = <Graphic data={data} />
    //         })
    //         diagramData = diagrams
    //     })();
    //     return diagramData
    // }, [])

    const active = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = (diagramId: string) => {
        if (openingDiagrams.some(o => o.id === diagramId)) return
        const targetDiagram = diagramData.current.find(d => d.id === diagramId)
        if (!targetDiagram) return
        openingDiagrams.push(targetDiagram)
        setOpeningDiagrams([...openingDiagrams]);
        setActiveKey(diagramId);
    };

    const remove = (targetKey: string) => {
        const diagrams = openingDiagrams.filter(d => d.id !== targetKey);
        setOpeningDiagrams(diagrams);
        const index = diagrams.length - 1;
        const activeKey = diagrams[index]?.id
        if (activeKey) setActiveKey(activeKey);
    };

    const removeAll = () => {
        setOpeningDiagrams([])
    }

    const onEdit = (targetKey: string, action: 'add' | 'remove') => {
        if (action === 'remove') remove(targetKey);
    };

    useEffect(() => {
        (async () => {
            // webassembly 数据初始化
            await init()
            const initData = await getDiagramData() as DiagramData
            console.log('log webassembly data', initData);

            // milisearch 图元初始化
            const allShape = await getCellAndLine() as ShapeData;
            console.log('log milisearch cellAndLine data', allShape);

            // const allShape: ShapeData = {
            //     "hits": [
            //         {
            //             "title": "作战单位61",
            //             "id": "42",
            //             "type": "cell",
            //             "action": "3",
            //             "contentType": "0",
            //             "group": "knowledge",
            //             "createTime": "2022/09/15"
            //         },
            //         {
            //             "title": "使命任务1",
            //             "desc": "这里是使命任务图元的描述信息",
            //             "id": "bac0b16e-4d1a-489b-8a27-438f409ea6a2",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "1",
            //             "value": {
            //                 "id": "bac0b16e-4d1a-489b-8a27-438f409ea6a2",
            //                 "x": 40,
            //                 "y": 40,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "使命任务1"
            //             }
            //         },
            //         {
            //             "title": "依赖关系线1",
            //             "desc": "这里是关系线图元的描述信息",
            //             "id": "d7a021cf-821d-4162-bd39-5a7932c20562",
            //             "type": "line",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "1",
            //             "value": {
            //                 "id": "d7a021cf-821d-4162-bd39-5a7932c20562",
            //                 "source": "142a0576-45bd-4f85-ae4a-6de443435cb1",
            //                 "target": "bac0b16e-4d1a-489b-8a27-438f409ea6a2"
            //             }
            //         },
            //         {
            //             "title": "作战单位2",
            //             "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
            //             "id": "2ce6d195-81df-45a1-83da-0f5d569c2d4b",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "2",
            //             "value": {
            //                 "id": "2ce6d195-81df-45a1-83da-0f5d569c2d4b",
            //                 "x": 140,
            //                 "y": 240,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "作战单位2"
            //             }
            //         },
            //         {
            //             "title": "使命任务2",
            //             "desc": "这里是使命任务图元的描述信息",
            //             "id": "0a432281-02f7-427e-958d-e80c7c9429cd",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "2",
            //             "value": {
            //                 "id": "0a432281-02f7-427e-958d-e80c7c9429cd",
            //                 "x": 140,
            //                 "y": 40,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "使命任务2"
            //             }
            //         },
            //         {
            //             "title": "依赖关系线2",
            //             "desc": "这里是关系线图元的描述信息",
            //             "id": "3a3c9216-378b-49de-a4f9-6803cf168eb3",
            //             "type": "line",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "2",
            //             "value": {
            //                 "id": "3a3c9216-378b-49de-a4f9-6803cf168eb3",
            //                 "source": "2ce6d195-81df-45a1-83da-0f5d569c2d4b",
            //                 "target": "0a432281-02f7-427e-958d-e80c7c9429cd"
            //             }
            //         },
            //         {
            //             "title": "作战单位3",
            //             "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
            //             "id": "d9f94695-adba-4655-a8fe-4283871d27a1",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "3",
            //             "value": {
            //                 "id": "d9f94695-adba-4655-a8fe-4283871d27a1",
            //                 "x": 40,
            //                 "y": 240,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "作战单位3"
            //             }
            //         },
            //         {
            //             "title": "使命任务3",
            //             "desc": "这里是使命任务图元的描述信息",
            //             "id": "398e0c92-2515-42aa-9aa4-ec6d679f33a5",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "3",
            //             "value": {
            //                 "id": "398e0c92-2515-42aa-9aa4-ec6d679f33a5",
            //                 "x": 40,
            //                 "y": 40,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "使命任务3"
            //             }
            //         },
            //         {
            //             "title": "依赖关系线3",
            //             "desc": "这里是关系线图元的描述信息",
            //             "id": "3e738229-668c-4f65-a721-34a69616c6b3",
            //             "type": "line",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "3",
            //             "value": {
            //                 "id": "3e738229-668c-4f65-a721-34a69616c6b3",
            //                 "source": "d9f94695-adba-4655-a8fe-4283871d27a1",
            //                 "target": "398e0c92-2515-42aa-9aa4-ec6d679f33a5"
            //             }
            //         },
            //         {
            //             "title": "作战单位4",
            //             "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
            //             "id": "f6d25121-f062-499c-bc02-1ce533e0520b",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "4",
            //             "value": {
            //                 "id": "f6d25121-f062-499c-bc02-1ce533e0520b",
            //                 "x": 40,
            //                 "y": 140,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "作战单位4"
            //             }
            //         },
            //         {
            //             "title": "使命任务4",
            //             "desc": "这里是使命任务图元的描述信息",
            //             "id": "eed8d38b-eb84-49f1-9f4b-705678a20e8b",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "4",
            //             "value": {
            //                 "id": "eed8d38b-eb84-49f1-9f4b-705678a20e8b",
            //                 "x": 40,
            //                 "y": 40,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "使命任务4"
            //             }
            //         },
            //         {
            //             "title": "依赖关系线1",
            //             "desc": "这里是关系线图元的描述信息",
            //             "id": "8ac33417-467d-441d-8b1c-99bee90c3c2f",
            //             "type": "line",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "4",
            //             "value": {
            //                 "id": "8ac33417-467d-441d-8b1c-99bee90c3c2f",
            //                 "source": "f6d25121-f062-499c-bc02-1ce533e0520b",
            //                 "target": "eed8d38b-eb84-49f1-9f4b-705678a20e8b"
            //             }
            //         },
            //         {
            //             "title": "作战单位6",
            //             "id": "4",
            //             "type": "cell",
            //             "action": "3",
            //             "contentType": "0",
            //             "group": "knowledge",
            //             "createTime": "2022/09/15"
            //         },
            //         {
            //             "title": "作战单位7",
            //             "id": "5",
            //             "type": "cell",
            //             "action": "3",
            //             "contentType": "0",
            //             "group": "knowledge",
            //             "createTime": "2022/09/15"
            //         },
            //         {
            //             "title": "作战单位连接线",
            //             "desc": "连接不同的作战单位。<br />from：作战单位<br />to：作战单位",
            //             "id": "7",
            //             "type": "line",
            //             "action": "1",
            //             "contentType": "4",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16"
            //         },
            //         {
            //             "title": "作战单位1",
            //             "desc": "执行活动并提供能力的任何实体，包括人、自主系统和任何人和自主系统的集合。",
            //             "id": "142a0576-45bd-4f85-ae4a-6de443435cb1",
            //             "type": "cell",
            //             "action": "1",
            //             "contentType": "1",
            //             "group": "none",
            //             "createTime": "2022/09/15",
            //             "eidtTime": "2022/09/16",
            //             "canCreate": "OV-1_高层作战概念视图",
            //             "ownerDiagramId": "1",
            //             "value": {
            //                 "id": "142a0576-45bd-4f85-ae4a-6de443435cb1",
            //                 "x": 140,
            //                 "y": 240,
            //                 "width": 80,
            //                 "height": 40,
            //                 "label": "作战单位1"
            //             }
            //         }
            //     ],
            //     "estimatedTotalHits": 16,
            //     "query": "",
            //     "limit": 1000,
            //     "offset": 0,
            //     "processingTimeMs": 0
            // }
            const cell = allShape?.hits?.filter(c => c.ownerDiagramId && c.type === Types.Cell)
            const line = allShape?.hits?.filter(c => c.ownerDiagramId && c.type === Types.Line)

            // 恢复视图数据
            const { diagrams } = initData
            diagramData.current = diagrams.map(d => {
                const data: GraphData = {
                    nodes: cell.filter(c => c.ownerDiagramId === d.id).map(c => generateNode(c)),
                    edges: line.filter(l => l.ownerDiagramId === d.id).map(l => generateLine(l))
                }
                d.data = data;
                // d.children = <Graphic data={data} />
                // return d
                return {
                    ...d,
                    key: d.id,
                    children: <Graphic data={data} />
                }
            })
        })();
    })

    useEffect(() => {
        const sub = projectTreeViewModel.openingDiagram$.subscribe(({ diagramId, shapeId, closeAll }) => {
            if (closeAll) {
                removeAll()
                return
            }
            if (diagramData.current.every(d => d.id !== diagramId)) return
            if (openingDiagrams.some(o => o.id === diagramId)) {
                // 已打开直接选中图元
                active(diagramId);
                if (shapeId) projectTreeViewModel.publishNavigateShapeId(shapeId)
            }
            else {
                // 未打开先开视图再选中图元
                add(diagramId)
                if (shapeId) projectTreeViewModel.setNavigateShapeId(shapeId)
            }
        })
        return () => {
            sub.unsubscribe()
        }
    }, [openingDiagrams, diagramData.current])

    return (
        <>
            <Tabs
                className={styles.diagram}
                hideAdd
                type="editable-card"
                onChange={active}
                activeKey={activeKey}
                onEdit={onEdit}
                items={openingDiagrams}
            />
        </>
    );
};

export default App;
import { Tabs } from 'antd';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm';
import { mockDiagramData } from '@/pages/data';
import styles from '@/pages/Components/Diagrams/index.less'

export type Diagram = {
    key: string
    label: string,
    children?: ReactElement,
}

const App: React.FC = () => {
    const diagramData = useRef<Diagram[]>(mockDiagramData)
    const [activeKey, setActiveKey] = useState<string>();
    const [openingDiagrams, setOpeningDiagrams] = useState<Diagram[]>([]);

    const active = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = (diagramId: string) => {
        if (openingDiagrams.some(o => o.key === diagramId)) return
        const targetDiagram = diagramData.current.find(d => d.key === diagramId)
        if (!targetDiagram) return
        openingDiagrams.push(targetDiagram)
        setOpeningDiagrams([...openingDiagrams]);
        setActiveKey(diagramId);
    };

    const remove = (targetKey: string) => {
        const diagrams = openingDiagrams.filter(d => d.key !== targetKey);
        setOpeningDiagrams(diagrams);
        const index = diagrams.length - 1;
        const activeKey = diagrams[index]?.key
        if (activeKey) setActiveKey(activeKey);
    };

    const removeAll = () => {
        setOpeningDiagrams([])
    }

    const onEdit = (targetKey: string, action: 'add' | 'remove') => {
        if (action === 'remove') remove(targetKey);
    };

    useEffect(() => {
        const sub = projectTreeViewModel.openingDiagram$.subscribe(({ diagramId, shapeId, closeAll }) => {
            if (closeAll) {
                removeAll()
                return
            }
            if (diagramData.current.every(d => d.key !== diagramId)) return
            if (openingDiagrams.some(o => o.key === diagramId)) {
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
    }, [openingDiagrams])

    return (
        <Tabs
            className={styles.diagram}
            hideAdd
            type="editable-card"
            onChange={active}
            activeKey={activeKey}
            onEdit={onEdit}
            items={openingDiagrams}
        />
    );
};

export default App;
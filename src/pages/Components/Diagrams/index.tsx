import { Tabs } from 'antd';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm';
import { mockDiagramData } from '@/pages/data';

export type Diagram = {
    key: string
    label: string,
    children?: ReactElement,
}

const App: React.FC = () => {
    const diagramData = useRef<Diagram[]>(mockDiagramData)
    const [activeKey, setActiveKey] = useState<string>();
    const [openingDiagrams, setOpeningDiagrams] = useState<Diagram[]>([]);

    const onChange = (newActiveKey: string) => {
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

    const onEdit = (targetKey: string, action: 'add' | 'remove') => {
        if (action === 'remove') remove(targetKey);
    };

    useEffect(() => {
        projectTreeViewModel.openingDiagramId$.subscribe((id) => {
            add(id)
        })
    }, [])

    return (
        <Tabs
            hideAdd
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={openingDiagrams}
        />
    );
};

export default App;
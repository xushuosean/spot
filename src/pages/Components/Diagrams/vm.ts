import { ReactElement } from 'react';
import { makeAutoObservable } from "mobx";
import { Subject } from "rxjs";
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm';

export type Diagram = {
    key: string
    label: string,
    children?: ReactElement,
}

class DiagramsViewModel {
    diagramData: Diagram[] = []
    openingDiagrams: Diagram[] = []
    activeKey: string | undefined
    openingDiagramId$: Subject<string> = new Subject<string>();

    constructor() {
        makeAutoObservable(this, {}, {})
        if (projectTreeViewModel) {
            projectTreeViewModel.openingDiagramId$.subscribe((id) => {
                this.openNewDiagram(id)
            })
        }
    }

    initDiagramData(diagramsData: Diagram[]) {
        this.diagramData = diagramsData
    }

    onDiagramChange(diagramId: string) {
        if (diagramId) this.activeKey = diagramId
    }

    openNewDiagram(diagramId: string) {
        if (this.openingDiagrams.some(o => o.key === diagramId)) return
        const targetDiagram = this.diagramData.find(d => d.key === diagramId)
        if (!targetDiagram) return
        this.openingDiagrams.push(targetDiagram)
        this.openingDiagrams = [...this.openingDiagrams]
    }

    closeDiagram(diagramId: string) {
        const diagrams = this.openingDiagrams.filter(d => d.key !== diagramId);
        if (diagrams.length !== this.openingDiagrams.length) {
            this.openingDiagrams = [...diagrams];
        }
    }
}

const vm = new DiagramsViewModel();
export default vm
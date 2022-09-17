import { Guid } from './../../BaseTypes';
import { makeAutoObservable } from "mobx"
import { Subject, Subscription } from "rxjs"
import { ProjectTreeFolder } from '@/pages/Components/ProjectTree/type'
import { PopModalProps } from '../Modal/type';

type NavigateType = {
    diagramId: string,
    shapeId?: string,
    closeAll?: boolean
}
export class ProjectTreeViewModel {

    treeData: ProjectTreeFolder[] = []
    selectedNodeKey: string | undefined
    openingDiagram$: Subject<NavigateType> = new Subject<NavigateType>();
    navigateToShape$: Subject<string> = new Subject<string>();
    navigateShapeId: string | undefined;
    openModal$: Subject<PopModalProps> = new Subject<PopModalProps>();
    isFireWorksWorking$: Subject<boolean> = new Subject<boolean>();

    constructor() {
        makeAutoObservable(this, {}, {})
    }

    initTree(treeData: ProjectTreeFolder[]) {
        this.treeData = treeData
    }

    openDiagram = (diagramId: Guid) => {
        this.openingDiagram$.next({ diagramId });
    }

    navigateToShape = (diagramId: string, shapeId: string) => {
        this.selectedNodeKey = diagramId;
        this.openingDiagram$.next({ diagramId, shapeId });
    }

    closeAllDiagrams = () => {
        this.openingDiagram$.next({ diagramId: '', closeAll: true })
    }

    isFireWorksWorking = (isWorking: boolean) => {
        this.isFireWorksWorking$.next(isWorking)
    }

    publishModalVisible = (props: PopModalProps) => {
        this.openModal$.next(props)
    }
    publishNavigateShapeId = (shapeId: string) => {
        this.navigateToShape$.next(shapeId)
    }

    setNavigateShapeId = (shapeId: string) => {
        this.navigateShapeId = shapeId
    }

    doubleClickTreeNode(nodeKey: string) {
        this.selectedNodeKey = nodeKey;
        this.openingDiagram$.next({ diagramId: nodeKey });
    }
}

const vm = new ProjectTreeViewModel();
export default vm
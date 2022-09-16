import { makeAutoObservable } from "mobx"
import { Subject, Subscription } from "rxjs"
import { ProjectTreeFolder } from '@/pages/Components/ProjectTree/type'

type NavigateType = {
    diagramId: string,
    shapeId?: string
}
export class ProjectTreeViewModel {

    treeData: ProjectTreeFolder[] = []
    selectedNodeKey: string | undefined
    openingDiagram$: Subject<NavigateType> = new Subject<NavigateType>();
    navigateToShape$: Subject<string> = new Subject<string>();
    navigateShapeId: string | undefined

    constructor() {
        makeAutoObservable(this, {}, {})
    }

    initTree(treeData: ProjectTreeFolder[]) {
        this.treeData = treeData
    }

    navigateToShape = (diagramId: string, shapeId: string) => {
        // 找到视图
        this.selectedNodeKey = diagramId;
        this.openingDiagram$.next({ diagramId, shapeId });
        // 打开视图
        // 选中图元
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
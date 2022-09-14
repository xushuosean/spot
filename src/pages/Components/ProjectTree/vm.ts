import { makeAutoObservable } from "mobx"
import { Subject } from "rxjs"
import { ProjectTreeFolder } from '@/pages/Components/ProjectTree/type'
// implements IProjectTreeViewModel

class ProjectTreeViewModel {

    treeData: ProjectTreeFolder[] = []
    selectedNodeKey: string | undefined
    openingDiagramId$: Subject<string> = new Subject<string>();

    constructor() {
        makeAutoObservable(this, {}, {})
    }

    initTree(treeData: ProjectTreeFolder[]) {
        this.treeData = treeData
    }

    navigateToShape(shapeId: string) {
        // 找到视图
        // 打开视图
        // 选中图元
    }

    doubleClickTreeNode(nodeKey: string) {
        this.selectedNodeKey = nodeKey;
        this.openingDiagramId$.next(nodeKey);
    }
}

const vm = new ProjectTreeViewModel();
export default vm
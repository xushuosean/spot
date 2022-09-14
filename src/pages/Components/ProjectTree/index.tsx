import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import vm from '@/pages/Components/ProjectTree/vm'

const ProjectTree = observer(() => {
    return (
        <>
            {
                vm.treeData.length > 0 &&
                < Tree
                    defaultExpandAll
                    treeData={vm.treeData}
                    onDoubleClick={(e, node) => {
                        vm.doubleClickTreeNode(node.key as string)
                    }}
                />
            }
        </>
    );
})

export default ProjectTree
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import ovFolder from '@/assets/ovFolder.svg'
import ovDiagramIcon from '@/assets/ovDiagramIcon.svg'
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
                    titleRender={(node) => {
                        return <>
                            <img src={!node.children?.length ? ovDiagramIcon : ovFolder} width={22} /> <span style={{ fontSize: 16 }}> {node.title}</span>
                        </>
                    }}
                />
            }
        </>
    );
})

export default ProjectTree
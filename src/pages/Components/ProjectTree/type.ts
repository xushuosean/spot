export type ProjectTreeFolder = {
    key: string,
    title: string,
    children: ProjectTreeNode[]
}

type ProjectTreeNode = {
    key: string,
    title: string,
}

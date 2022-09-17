import { ListItem } from "@/pages/BaseTypes"
import { GraphData } from "@/pages/Services/GraphicService"
import { ReactElement } from "react"

export type ShapeData = {
    hits: ListItem[],
}

export type DiagramData = {
    diagrams: Diagram[]
}

export type Diagram = {
    key: string,
    id: string
    label: string,
    data: GraphData,
    children?: ReactElement,
}
import { Addon, Graph } from '@antv/x6';
import { Dnd } from '@antv/x6/lib/addon';

export type GraphData = {
  nodes: Node[],
  edges: Edge[]
}

type Node = {
  id: string,      // String，可选，节点的唯一标识
  x: number,       // Number，必选，节点位置的 x 值
  y: number,       // Number，必选，节点位置的 y 值
  width: number,   // Number，可选，节点大小的 width 值
  height: number,  // Number，可选，节点大小的 height 值
  label: string,   // String，节点标签
}

type Edge = {
  source: string, // String，必须，起始节点 id
  target: string, // String，必须，目标节点 id
}

class GraphicService {
  private graph: Graph | undefined;
  private dnd: Addon.Dnd | undefined;

  createCanvas(dom: HTMLElement, data: GraphData) {
    this.graph = new Graph({
      container: dom,
      width: 800,
      height: 600,
      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      },
    })
    this.graph.fromJSON(data)
  }

  getGraph() {
    return this.graph;
  }

  getDnd() {
    return this.dnd;
  }
}

export default GraphicService;
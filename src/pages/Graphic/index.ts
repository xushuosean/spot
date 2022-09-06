import { Graph } from '@antv/x6';

const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
};

class Graphic {
  private graph: Graph | undefined;
  createCanvas(dom: HTMLElement) {
    this.graph = new Graph({
      container: dom,
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
}

export default new Graphic();
import { ComponentType, ContentList } from '@/pages/BaseTypes';
import { ProjectTreeFolder } from '@/pages/Components/ProjectTree/type';
import { Diagram } from '@/pages/Components/Diagrams/vm';
import Graphic from './Graphic';

export const data: ContentList[] = [
  {
    title: '11',
    type: ComponentType.Description,
  },
  {
    title: '22',
    type: ComponentType.Description
  }
]

export const mockDiagramData: Diagram[] = [
  {
    key: 'ov-1_高层zz概念视图1',
    label: 'ov-1_高层zz概念视图1',
    data: {
      // 节点
      nodes: [
        {
          id: '2', // String，可选，节点的唯一标识
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
          source: '2', // String，必须，起始节点 id
          target: 'node2', // String，必须，目标节点 id
        },
      ],
    },
    // children: <Graphic data={
    //   {
    //     // 节点
    //     nodes: [
    //       {
    //         id: '2', // String，可选，节点的唯一标识
    //         x: 40,       // Number，必选，节点位置的 x 值
    //         y: 40,       // Number，必选，节点位置的 y 值
    //         width: 80,   // Number，可选，节点大小的 width 值
    //         height: 40,  // Number，可选，节点大小的 height 值
    //         label: 'hello', // String，节点标签
    //       },
    //       {
    //         id: 'node2', // String，节点的唯一标识
    //         x: 160,      // Number，必选，节点位置的 x 值
    //         y: 180,      // Number，必选，节点位置的 y 值
    //         width: 80,   // Number，可选，节点大小的 width 值
    //         height: 40,  // Number，可选，节点大小的 height 值
    //         label: 'world', // String，节点标签
    //       },
    //     ],
    //     // 边
    //     edges: [
    //       {
    //         source: '2', // String，必须，起始节点 id
    //         target: 'node2', // String，必须，目标节点 id
    //       },
    //     ],
    //   }
    // } />
  },
  {
    key: 'ov-1_高层图形zz概念视图1',
    label: 'ov-1_高层图形zz概念视图1',
    children: <Graphic data={
      {
        // 节点
        nodes: [
          {
            id: '2', // String，可选，节点的唯一标识
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
            source: '2', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
          },
        ],
      }
    } />
  },
  {
    key: 'ov-2_zz单位关系视图1',
    label: 'ov-2_zz单位关系视图1',
    children: <Graphic data={
      {
        // 节点
        nodes: [
          {
            id: '2', // String，可选，节点的唯一标识
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
            source: '2', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
          },
        ],
      }
    } />
  },
  {
    key: 'ov-2_zz部队资源流视图1',
    label: 'ov-2_zz部队资源流视图1',
    children: <Graphic data={
      {
        // 节点
        nodes: [
          {
            id: '2', // String，可选，节点的唯一标识
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
            source: '2', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
          },
        ],
      }
    } />
  }
]

export const treeData: ProjectTreeFolder[] = [
  {
    key: 'ov-1',
    title: 'ov-1',
    children: [
      {
        key: 'ov-1_高层zz概念视图1',
        title: 'ov-1_高层zz概念视图1',
      },
      {
        key: 'ov-1_高层图形zz概念视图1',
        title: 'ov-1_高层图形zz概念视图1',
      }
    ]
  },
  {
    key: 'ov-2',
    title: 'ov-2',
    children: [
      {
        key: 'ov-2_zz单位关系视图1',
        title: 'ov-2_zz单位关系视图1',
      },
      {
        key: 'ov-2_zz部队资源流视图1',
        title: 'ov-2_zz部队资源流视图1',
      }
    ]
  }
]
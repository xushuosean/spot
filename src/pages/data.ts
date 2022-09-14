import { ComponentType, ContentList } from '@/pages/BaseTypes';
import { ProjectTreeFolder } from '@/pages/Components/ProjectTree/type';
import { Diagram } from '@/pages/Components/Diagrams/vm';

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
  },
  {
    key: 'ov-1_高层图形zz概念视图1',
    label: 'ov-1_高层图形zz概念视图1',
  },
  {
    key: 'ov-2_zz单位关系视图1',
    label: 'ov-2_zz单位关系视图1',
  },
  {
    key: 'ov-2_zz部队资源流视图1',
    label: 'ov-2_zz部队资源流视图1',
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
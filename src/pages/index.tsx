import { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import yayJpg from '../assets/yay.jpg';
import { Search } from './Components/Search';
import ShortcutService from './Services/ShortcutService';
import { ToolBox } from './ToolBox';
// import init, { getData } from "wasm-lib";
import init, { getData } from "wasm-lib";
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm'
import { treeData, mockDiagramData } from '@/pages/data';
import ProjectTree from '@/pages/Components/ProjectTree/index';
import Diagrams from '@/pages/Components/Diagrams/index';

type block = {
  id: string,
  label: string,
}
type Data = {
  blocks: block[]
}

export default function HomePage() {
  const [list, setList] = useState<Data>();
  useEffect(() => {
    init().then(() => {
      const initData = getData() as Data
      setList(initData)
    })
  }, [])

  useEffect(() => {
    const keydownSub = fromEvent(document, 'keydown').subscribe((e) => {
      ShortcutService.onGlobalKeydown(e as KeyboardEvent)
    })
    if (projectTreeViewModel) projectTreeViewModel.initTree(treeData)
    return () => {
      keydownSub.unsubscribe();
    }
  }, [])

  return (
    <div className='yt-container'>
      <button onClick={() => projectTreeViewModel.navigateToShape("ov-1_高层zz概念视图1", "ov-1_node1")}>点击</button>
      <ToolBox />
      <Search />
      <ProjectTree />
      <Diagrams />
      {/* <div>
        {
          list?.blocks.map(b =>
            <span key={b.id}>
              {b.label}
            </span>
          )
        }
      </div> */}
    </div >
  );
}

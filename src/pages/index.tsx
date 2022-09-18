import { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import yayJpg from '../assets/yay.jpg';
import { Search } from './Components/Search';
import ShortcutService from './Services/ShortcutService';
import { ToolBox } from './ToolBox';
import init, { getData } from "wasm-lib";
import projectTreeViewModel from '@/pages/Components/ProjectTree/vm'
import { treeData, mockDiagramData } from '@/pages/data';
import ProjectTree from '@/pages/Components/ProjectTree/index';
import Diagrams from '@/pages/Components/Diagrams/index';
import PopModal from './Components/Modal';
import { Fireworks, FireworksOptions } from '@fireworks-js/react'
import fireWorks1 from '@/assets/sounds/explosion0.mp3';
import fireWorks2 from '@/assets/sounds/explosion1.mp3';
import fireWorks3 from '@/assets/sounds/explosion2.mp3';
import { message } from 'antd';
import myIcon from '@/assets/table-icon.svg'
import Logo from '@/assets/logo.png'

const options: FireworksOptions = {
  autoresize: true,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  trace: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 360
  },
  delay: {
    min: 15,
    max: 30
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 3
    },
    trace: {
      min: 1,
      max: 2
    }
  },
  brightness: {
    min: 50,
    max: 80
  },
  decay: {
    min: 0.015,
    max: 0.03
  },
  mouse: {
    click: false,
    move: false,
    max: 1
  },
  sound: {
    enabled: true,
    files: [
      fireWorks1,
      fireWorks2,
      fireWorks3
    ],
    volume: {
      max: 10,
      min: 1
    }
  }
}

type block = {
  id: string,
  label: string,
}
type Diagram = {
  id: string,
  label: string,
}

export default function HomePage() {

  const [fireWorksVisible, setFireWorksVisible] = useState(false)

  const controlFireworks = (isWorking: boolean) => {
    setFireWorksVisible(isWorking)
    if (!isWorking) return
    const config = {
      top: 600,
      className: 'logoWrapper',
      content: ' ',
      duration: 300,
      icon: <div className='imgWrapper' >
        <img className='logoImg' src={Logo} />
      </ div>
    }
    message.success(config)
  }


  useEffect(() => {
    const keydownSub = fromEvent(document, 'keydown').subscribe((e) => {
      ShortcutService.onGlobalKeydown(e as KeyboardEvent)
    })

    if (!projectTreeViewModel) return
    projectTreeViewModel.isFireWorksWorking$.subscribe(controlFireworks)
    projectTreeViewModel.initTree(treeData)
    return () => {
      keydownSub.unsubscribe();
    }
  }, [])

  return (
    <div className='yt-container'>
      {/* <button onClick={() => controlFireworks(true)}>点击</button> */}
      {/* <ToolBox /> */}
      <Search />
      <ProjectTree />
      <Diagrams />
      <PopModal />
      {fireWorksVisible && (
        <Fireworks
          options={options}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            background: 'transparent'
          }}
        />
      )}
    </div >
  );
}

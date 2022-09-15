import { Rect } from "@antv/x6/lib/shape/basic";

const createRect = (title: string, desc: string, diagram: string) => {
  return new Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
      text: { text: title, fill: 'white' },
      desc: { text: desc },
      diagram: { text: diagram }
    },
  })
}

const zzdw = createRect('作战单位', '这是作战单位的描述', 'ov1视图')
const zzbd = createRect('作战部队', '这是作战部队的描述', 'ov2资源流描述视图')

export {
  zzdw,
  zzbd
}
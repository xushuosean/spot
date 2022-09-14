import { Stencil } from "@antv/x6/lib/addon";
import { Circle, Rect } from "@antv/x6/lib/shape/basic";
import { Menu, Tree } from "antd"
import { useEffect, useRef } from "react";
import Graphic from "../Graphic";

export const ToolBox = () => {

  const stencilContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setTimeout(() => {
      const stencil = new Stencil({
        title: 'Components',
        target: Graphic.getGraph(),
        search(cell, keyword) {
          return cell.shape.indexOf(keyword) !== -1
        },
        placeholder: 'Search by shape name',
        notFoundText: 'Not Found',
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
          {
            name: 'group1',
            title: 'Group(Collapsable)',
          },
          {
            name: 'group2',
            title: 'Group',
            collapsable: false,
          },
        ],
      });

      stencilContainer.current?.appendChild(stencil.container)

      const r = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
          text: { text: 'rect', fill: 'white' },
        },
      })

      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
          text: { text: 'ellipse', fill: 'white' },
        },
      })

      const c2 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
          text: { text: 'ellipse', fill: 'white' },
        },
      })

      const r2 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
          text: { text: 'rect', fill: 'white' },
        },
      })

      const r3 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
          text: { text: 'rect', fill: 'white' },
        },
      })

      const c3 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
          text: { text: 'ellipse', fill: 'white' },
        },
      })

      stencil.load([r, c, c2, r2.clone()], 'group1')
      stencil.load([c2.clone(), r2, r3, c3], 'group2')
    }, 300);

  }, [])


  return <div style={{ width: 200, height: '100%', position: 'relative' }} ref={stencilContainer}></div>
}
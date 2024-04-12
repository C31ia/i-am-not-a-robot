import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { Graph } from './Graph'

import './DnD.css'

export default function DnD() {
  const correctOrder = [5, 2, 1, 4, 3]

  const [bars, setBars] = useState([
    { id: 1, title: 'barOne' },
    { id: 2, title: 'barTwo' },
    { id: 3, title: 'barThree' },
    { id: 4, title: 'barFour' },
    { id: 5, title: 'barFive' },
  ])

  const sensors = useSensors(useSensor(PointerSensor))

  const getBarPos = (id) => bars.findIndex((bar) => bar.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event
    checkOrder()
    if (active.id === over.id) return
    setBars((bars) => {
      const originalPos = getBarPos(active.id)
      const newPos = getBarPos(over.id)
      // console.log(bars)
      return arrayMove(bars, originalPos, newPos)
    })
  }

  const checkOrder = () => {
    const currentOrder = bars.map((bar) => bar.id)
    if (currentOrder.toString() === correctOrder.toString()) {
      console.log('WIN')
    }
  }

  return (
    <div className="graphBg">
      <p className="graphTitle">Welcome to quarterly productivity profits</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Graph id="toDo" bars={bars} />
      </DndContext>
    </div>
  )
}

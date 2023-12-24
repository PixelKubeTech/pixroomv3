import React from 'react'
import CalenderFormComponent from './CalenderFormComponent'
import TimelineComponent from './TimelineComponent'

function BottomComponent() {
  return (
    <div className='flex px-8 flex-auto max-h-[calc(100%-240px)] '>
        <TimelineComponent />
        <CalenderFormComponent />
    </div>
  )
}

export default BottomComponent
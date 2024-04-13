import React from 'react'
import CalenderFormComponent from './CalenderFormComponent'
import TimelineComponent from './TimelineComponent'
import { MeetingInfoContext } from '@/app/context/MeetingContext'

function BottomComponent() {
  const meetingInfo = React.useContext(MeetingInfoContext)
  return (
    <div className='flex px-8 flex-auto max-h-[calc(100%-240px)] '>
        <TimelineComponent meetingInfo={meetingInfo} />
        <CalenderFormComponent meetingInfo={meetingInfo} />
    </div>
  )
}

export default BottomComponent
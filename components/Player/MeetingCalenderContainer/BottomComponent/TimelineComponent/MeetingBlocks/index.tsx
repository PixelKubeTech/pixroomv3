import React from 'react'

function MeetingBlock({isAvailabe, bookingDetails} : any) {
  return (
    <div className={`flex flex-col rounded-lg p-4 ${isAvailabe ? 'bg-[#0072B8]/5' :'bg-[#ED1C24]/5'} cursor-pointer`}>
      <div className='flex '>
        <div className='font-bold basis-1/5'>{bookingDetails.from}</div>
        <div className='uppercase font-bold'>{!isAvailabe ? bookingDetails.meetingName : ''}</div>
      </div>
      <div className='flex '>
        <div className='font-bold basis-1/5'>{bookingDetails.to}</div>
        <div>{!isAvailabe ? 'Booked by ' + bookingDetails.bookingPersonName : ''}</div>
      </div>
      {bookingDetails.duration > 1 && Array.from(Array(bookingDetails.duration - 1).keys()).map(data => 
        <div className='min-h-[24px]' key={data}></div>
        )}
    </div>
  )
}

export default MeetingBlock
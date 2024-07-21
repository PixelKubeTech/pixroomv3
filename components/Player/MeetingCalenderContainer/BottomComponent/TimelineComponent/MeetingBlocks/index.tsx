import React from 'react';

function MeetingBlock({ isAvailable, bookingDetails, parentProps, onClick }: any) {
  const handleClick = () => {
    onClick({ isAvailable, bookingDetails, parentProps });
  };

  return (
    <div
      className={`flex flex-col rounded-lg p-4 ${isAvailable ? 'bg-[#0072B8]/5' : 'bg-[#ED1C24]/5'} cursor-pointer`}
      onClick={handleClick}
    >
      <div className='flex '>
        <div className='font-bold basis-1/5'>{bookingDetails.from}</div>
        <div className='uppercase font-bold'>
          {parentProps && parentProps.themeInfo && parentProps.themeInfo.hideSubject
            ? 'BUSY'
            : bookingDetails.meetingName}
        </div>
      </div>
      <div className='flex '>
        <div className='font-bold basis-1/5'>{bookingDetails.to}</div>
        <div>
          {parentProps && parentProps.themeInfo && parentProps.themeInfo.showOrganizer
            ? 'Booked by ' + bookingDetails.bookingPersonName
            : 'Booked by XXXXXXXX'}
        </div>
      </div>
      {bookingDetails.duration > 1 && Array.from(Array(bookingDetails.duration - 1).keys()).map((data) => (
        <div className='min-h-[24px]' key={data}></div>
      ))}
    </div>
  );
}

export default MeetingBlock;

import React from 'react';

function MeetingBlock({ isAvailable, bookingDetails, parentProps, onClick }: any) {
  const handleClick = () => {
    onClick({ isAvailable, bookingDetails, parentProps });
  };

  return (
    <div
      className={`flex flex-col gap-2 p-4 meeting-block-border ${isAvailable ? 'bg-[#CDDAD6]' : ''} cursor-pointer`}
      onClick={handleClick}
    >
      <div className='flex gap-6 items-baseline'>
        <div className='font-bold'>{bookingDetails.from}</div>
        <div className='uppercase font-bold'>
          {parentProps && parentProps.themeInfo && parentProps.themeInfo.hideSubject
            ? 'BUSY'
            : bookingDetails.meetingName}
        </div>
      </div>
      <div className='flex gap-6 items-baseline'>
        <div className='font-bold'>{bookingDetails.to}</div>
        <div className='break-all w-[85%] text-[13px] font-medium text-[#616161]'>
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

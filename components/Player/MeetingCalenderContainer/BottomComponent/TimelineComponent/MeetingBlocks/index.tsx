import React, { useState, useEffect } from 'react';

//function MeetingBlock({ isAvailable, bookingDetails, parentProps, onClick }: any) {
function MeetingBlock({ isAvailable, bookingDetails, parentProps, themeInfo, onClick, setStartTime = () => {}, setEndTime = () => {}, currentIndex, selectedMeetingIndex, setSelectedMeetingIndex }: any) {
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const totalSlots = Math.ceil(
    (new Date(`2000-01-01T${bookingDetails.to}:00`).getTime() - 
     new Date(`2000-01-01T${bookingDetails.from}:00`).getTime()) / 
    (15 * 60 * 1000)
  );

  const handleMouseDown = (index: number) => {
    if (isAvailable) {
      setSelectedSlots([index]);
      setIsDragging(true);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging && isAvailable) {
      setSelectedSlots(prevSelected => {
        const start = Math.min(prevSelected[0], index);
        const end = Math.max(prevSelected[0], index);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      });
      setSelectedMeetingIndex(currentIndex);
    }
  };


  // const handleMouseEnter = (index: number) => {
  //   if (isDragging && isAvailable) {
  //     const startTime = addMinutes(bookingDetails.from, selectedSlots[0] * 15);
  //     const endTime = addMinutes(bookingDetails.from, (selectedSlots[selectedSlots.length - 1] + 1) * 15);
  //     setSelectedSlots(prevSelected => {
  //       const start = Math.min(prevSelected[0], index);
  //       const end = Math.max(prevSelected[0], index);
  //       return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  //     });
  //     setSelectedMeetingIndex(currentIndex);
  //     onClick({
  //       isAvailable,
  //       bookingDetails: {
  //         ...bookingDetails,
  //         from: startTime,
  //         to: endTime,
  //         duration: selectedSlots.length
  //       },
  //       parentProps
  //     });
  //   }
  // };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (isAvailable && selectedSlots.length > 0) {
      const startTime = addMinutes(bookingDetails.from, selectedSlots[0] * 15);
      const endTime = addMinutes(bookingDetails.from, (selectedSlots[selectedSlots.length - 1] + 1) * 15);
      setStartTime(startTime);
      setEndTime(endTime);
      onClick({
        isAvailable,
        bookingDetails: {
          ...bookingDetails,
          from: startTime,
          to: endTime,
          duration: selectedSlots.length
        },
        parentProps
      });
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  const addMinutes = (time: string, minutes: number) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date(2000, 0, 1, hours, mins + minutes);
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className={`flex flex-col rounded-lg p-4 ${isAvailable ? 'bg-[#0072B8]/5' : 'bg-[#ED1C24]/5'}`}>
      <div className='flex'>
        <div className='font-bold basis-1/5'>{bookingDetails.from}</div>
        <div className='uppercase font-bold'>
          {themeInfo?.hideSubject ? 'BUSY' : bookingDetails.meetingName}
        </div>
      </div>
      {isAvailable ? (
        <div className="flex flex-col mt-2">
          {Array.from({ length: totalSlots }).map((_, index) => (
            <div
              key={index}
              className={`h-4 mb-1 rounded cursor-pointer ${
                selectedMeetingIndex === currentIndex && selectedSlots.includes(index) ? 'bg-red-500' : 'bg-gray-200'
              }`}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ) : (
        <>
          <div className='flex'>
            <div className='font-bold basis-1/5'>{bookingDetails.to}</div>
            <div>
              {themeInfo?.showOrganizer && bookingDetails?.bookingPersonName
                ? 'Booked by ' + bookingDetails.bookingPersonName
                : ''}
            </div>
          </div>
          {bookingDetails.duration > 1 && Array.from(Array(bookingDetails.duration - 1).keys()).map((data) => (
            <div className='min-h-[24px]' key={data}></div>
          ))}
        </>
      )}
    </div>
  );
}

export default MeetingBlock;
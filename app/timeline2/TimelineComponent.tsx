import React, { useState, useRef, useEffect } from 'react';

const DragIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 cursor-grab">
      <circle cx="12" cy="12" r="11" fill="white" stroke='#999999' strokeWidth={1}/>
      <path d="M7 10H17M7 14H17" stroke="grey" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

const MeetingTimeline = ({ startTime, endTime, onEndTimeChange }) => {
  const [currentEndTime, setCurrentEndTime] = useState(endTime);
  const progressBarRef = useRef<any>(null);
  const isDraggingRef = useRef(false);

  const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${(hours).toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  

  const normalizeMinutes = (minutes) => {
    return minutes >= 0 ? minutes : minutes + 24 * 60;
  };

  

  const startMinutes = parseTime(startTime);
  let initialEndMinutes = parseTime(endTime);
  if (initialEndMinutes <= startMinutes) {
    initialEndMinutes += 24 * 60; // Add 24 hours if end time is on the next day
  }
  const extendedEndMinutes = initialEndMinutes + 4 * 60; // Extend by 4 hours from initial end time
  const totalMinutes = extendedEndMinutes - startMinutes;

  const currentTimeMinutes = parseTime(new Date().toTimeString().slice(0, 5));
  const endMinutes = parseTime(currentEndTime);

  const progressPercentage = ((endMinutes - startMinutes) / totalMinutes) * 100;
  const currentTimePercentage = ((currentTimeMinutes - startMinutes) / totalMinutes) * 100;

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    
    const newEndMinutes = Math.round(((percentage / 100) * totalMinutes + startMinutes) / 5) * 5;
    
    // Ensure the new end time is not earlier than the initial end time
    const adjustedEndMinutes = Math.max(newEndMinutes, initialEndMinutes);
    
    const newEndTime = formatTime(normalizeMinutes(adjustedEndMinutes));
    setCurrentEndTime(newEndTime);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    onEndTimeChange(currentEndTime);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const generateTimeMarks = () => {
    const marks: any = [];
    for (let i = 0; i <= totalMinutes; i += 60) {
      const time = formatTime(normalizeMinutes(startMinutes + i));
      const percentage = (i / totalMinutes) * 100;
      marks.push(
        <div key={i} className="absolute transform -translate-x-1/2" style={{ left: `${percentage}%` }}>
          <div className="h-2 w-0.5 ml-[15px] bg-gray-300 mb-1"></div>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
      );
    }
    return marks;
  };

  return (
    <div className="w-[100%] mx-auto bg-white p-6">
      <h2 className="text-xl font-bold mb-4">Amend the time of your current meeting below:</h2>
      
      <div className="flex justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500">Start</p>
          <p className="text-2xl font-bold text-green-500">{startTime}</p>
        </div>
        <div className="flex items-center">
        <button className="bg-pink-300 text-red-700 text-sm font-bold px-2 py-2 rounded-full" style={{width: '60px', height: '60px', borderRadius: '50%'}}>END NOW</button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">End</p>
          <p className="text-2xl font-bold text-green-500">{currentEndTime}</p>
        </div>
      </div>
      
      <div className="relative pt-1">
        <div 
          ref={progressBarRef}
          className="overflow-visible h-2 mb-8 text-xs flex rounded bg-gray-200 cursor-pointer relative"
          onMouseDown={handleMouseDown}
        >
          <div 
            style={{ width: `${progressPercentage}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-cyan-400 relative rounded-l"
          >
            <div className='shadow'> <DragIcon /></div>
          </div>
        </div>
        <div className="relative h-6 -mt-6">
          {generateTimeMarks()}
        </div>
      </div>
    </div>
  );
};

export default MeetingTimeline;
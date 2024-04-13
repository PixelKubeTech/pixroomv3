import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import './styles.css'
function AnalogClock(props) {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[date.getDay()].substring(0,3).toUpperCase();
  useEffect(() => {
    
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="clock-container">
      <Clock value={value} size={120} hourMarksLength={15}  className={props.isAvailable? "black-clock":"red-clock"}/>
      <div  className="day-text">{currentDay}</div>
    </div>
  );
}

export default AnalogClock

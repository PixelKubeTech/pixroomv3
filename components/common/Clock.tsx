"use client";
import * as React from "react";
import "./clock.css";

interface Interval {
  start: number;
  end: number;
}

export interface ClockProps {
  intervals: Interval[];
}

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Clock(props: ClockProps): JSX.Element {
  const { intervals } = props;
  const marks = Array.from({ length: 60 }, (_, i) => i + 1);
  const clockSize = 120;

  const [time, setTime] = React.useState<Time>(() => {
    const currentDate = new Date();
    return {
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      seconds: currentDate.getSeconds(),
    };
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const currentTimeObject: Time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };
      setTime(currentTimeObject);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const shouldHighlight = (minute: number): boolean => {
    return minute % 5 === 0; // Change this condition based on your requirement
  };

  const getSectionColor = (index: number, intervals: Interval[]): string => {
    const currentMinute = index * 6;
    for (let i = 0; i < intervals.length; i++) {
      if (currentMinute >= intervals[i].start && currentMinute <= intervals[i].end) {
        return "red";
      }
    }
    return "green";
  };

  return (
    <div className="clock" style={{width: clockSize + 'px', height: clockSize + 'px' }}>
        {Array.from({ length: 360 }).map((_, index) => (
          <div
            key={index}
            className="borderSection"
            style={{
              transform: `rotate(${index}deg) translateX(50%)`,
              transformOrigin: `0 ${clockSize/2}px`,
              backgroundColor: getSectionColor(index, intervals),
            }}
          />
        ))}
        <div>
          <div>
            {marks.map((mark) => (
              <span
                key={mark}
                className={`${mark % 5 === 0 ? "hour-mark" : "minute-mark"}`}
                style={{
                  transform: `translateX(-75%) translateY(-85%) rotate(${mark * 6}deg)`,
                  transformOrigin: `0 ${clockSize/2}px`,
                  backgroundColor: shouldHighlight(mark) ? "black" : "grey",
                }}
              />
            ))}
          </div>
        </div>
        <div
          className="hours"
          style={{
            transform: `rotate(${time.hours * 30 - 90}deg) translateX(-10px)`,
          }}
        ></div>
        <div
          className="minutes"
          style={{
            transform: `rotate(${time.minutes * 6 - 90}deg) translateX(-15px)`,
          }}
        ></div>
        <div
          className="seconds"
          style={{
            transform: `rotate(${time.seconds * 6 - 90}deg) translateX(-15px)`,
          }}
        ></div>
      </div>
  );
}


// function App() {
//   return <Clock intervals={intervalsFromAPI} />;
// }

// export default App;

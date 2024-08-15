"use client";
import * as React from "react";

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

  const customRed = "#d4422f";
  const customGreen = "#63917c";

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
        return customRed;
      }
    }
    return customGreen;
  };
  const getTodayDay = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date();
    const day = today.getDay();
    return days[day];
  };

  return (
    // Clock
    <div className="relative w-9/12 h-9/12 rounded-full" 
      style={{
        width: clockSize + 'px', height: clockSize + 'px',
        boxShadow: `inset 0px 0px rgba(52, 73, 94, 0.75)`,
      }}>
        {Array.from({ length: 360 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-2.5 h-0.5 left-2/4"
            style={{
              transform: `rotate(${index}deg) translateX(50%)`,
              transformOrigin: `0 ${clockSize/2}px`,
              backgroundColor: getSectionColor(index, intervals),
            }}
          />
        ))}
        <div>
          <div>
            {/* hour-mark | minute-mark */}
            {marks.map((mark) => (
              <span
                key={mark}
                className={`${mark % 5 === 0 ? "absolute w-0.5 h-4 left-[51%] mt-3.5 mb-2.5" : "absolute w-px h-2.5 left-2/4 mt-2.5 mb-2.5"}`}
                style={{
                  transform: `translateX(-75%) translateY(-85%) rotate(${mark * 6}deg)`,
                  transformOrigin: `0 ${clockSize/2}px`,
                  backgroundColor: shouldHighlight(mark) ? "black" : "grey",
                }}
              />
            ))}
          </div>
        </div>
        {/* hours */}
        <div
          className="absolute w-[40px] h-1 bg-[black] top-2/4 left-2/4 -mt-1"
          style={{
            transform: `rotate(${time.hours * 30 - 90}deg) translateX(-10px)`,
            transformOrigin: `center left`,
            boxShadow: `0 2px 3px rgba(52, 73, 94, 0.5)`,
          }}
        ></div>
        {/* minutes */}
        <div
          className="absolute h-0.5 w-[45%] bg-[black] top-2/4 left-2/4 -m-0.5"
          style={{
            transform: `rotate(${time.minutes * 6 - 90}deg) translateX(-15px)`,
            transformOrigin: `center left`,
            boxShadow: `0 2px 3px rgba(52, 73, 94, 0.5)`,
          }}
        ></div>
        {/* seconds */}
        <div
          className="absolute h-px w-[50%] bg-[crimson] top-2/4 left-2/4 -mt-px"
          style={{
            transform: `rotate(${time.seconds * 6 - 90}deg) translateX(-15px)`,
            transformOrigin: `center left`,
            boxShadow: `0 2px 3px rgba(192, 57, 43, 0.5)`,
          }}
        ></div>
        <div className="absolute bottom-[22px] left-[44px] text-[#6f6f6f] text-sm">{getTodayDay()}</div>
      </div>
  );
}


// function App() {
//   return <Clock intervals={intervalsFromAPI} />;
// }

// export default App;

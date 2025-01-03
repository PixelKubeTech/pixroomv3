'use client';
import { Interval } from '@/app/interface/Intervals';
import * as React from 'react';
  
  export interface ClockProps {
    intervals: Interval[];
  }

export default function Clock(props: ClockProps) {
    const radius = 80; // Adjustable radius for the clock
    const { intervals } = props;


    React.useEffect(() => {
        // Set initial time for animations
        const time = new Date();
        const hour = -3600 * (time.getHours() % 12);
        const mins = -60 * time.getMinutes();
        const clockFace = document.getElementById("analogclock");

        if (clockFace) {
            clockFace.style.setProperty("--_dm", `${mins}s`);
            clockFace.style.setProperty("--_dh", `${hour + mins}s`);
        }
    }, []);
    const getSectionColor = (minute: number): string => {
        // const busyIntervals = [
        //     { start: 0, end: 45 }, // Define busy intervals in minutes
        //     { start: 180, end: 270 },
        // ];
        for (const interval of intervals) {
            if (minute >= interval.start && minute <= interval.end) {
                return 'red'; // Busy color
            }
        }
        return 'green'; // Free color
    };
    const getTodayDay = () => {
        const today = new Date();
        return today.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    };

    return (
        <div className="clock-wrapper">
            <div className="clock" style={{ width: radius * 2, height: radius * 2 }}>
                {/* Dial Ring */}
                {Array.from({ length: 360 }).map((_, index) => (
                    <div
                        key={index}
                        className="dial-section"
                        style={{
                            transform: `rotate(${index}deg) translate(${radius - 6}px)`,
                            backgroundColor: getSectionColor(index),
                        }}
                    />
                ))}
                <div className="clock-face" id="analogclock">
                    <time dateTime="12:00">12</time>
                    <time dateTime="1:00">1</time>
                    <time dateTime="2:00">2</time>
                    <time dateTime="3:00">3</time>
                    <time dateTime="4:00">4</time>
                    <time dateTime="5:00">5</time>
                    <time dateTime="6:00">6</time>
                    <time dateTime="7:00">7</time>
                    <time dateTime="8:00">8</time>
                    <time dateTime="9:00">9</time>
                    <time dateTime="10:00">10</time>
                    <time dateTime="11:00">11</time>
                    <span className="arm seconds"></span>
                    <span className="arm minutes"></span>
                    <span className="arm hours"></span>
                </div>
                <div className="day-text">{getTodayDay()}</div>

            </div>

            {/* Styles */}
            <style jsx>{`   
@keyframes turn {
  to {
    transform: rotate(1turn);
  }
}        
.clock {
	--_ow: clamp(5rem, 60vw, 40rem);
	--_w: 88cqi;
    --_r: calc((var(--_w) - var(--_sz)) / 2);
    --_sz: 12cqi;
    block-size: var(--_ow);
    border-radius: 50%;
	container-type: inline-size;
	font-family: ui-sans-serif, system-ui, sans-serif;
	inline-size: var(--_ow);
	margin-inline: auto;
	place-content: center;
  position: relative;
  justify-content: center;
  display: flex;                    
  align-items: center;
  justify-content: center;
}
  .clock-face {
  aspect-ratio: 1;
  border-radius: 50%;
  block-size: var(--_w);
	font-size: 8cqi;
	font-weight: 700;
  list-style-type: none;
  inline-size: var(--_w);
  padding: unset;
  position: relative;
}
                .dial-section {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;

                }
.clock-face time {
  --_x: calc(var(--_r) + (var(--_r) * cos(var(--_d))));
  --_y: calc(var(--_r) + (var(--_r) * sin(var(--_d))));
  display: grid;
  height: var(--_sz);
  left: var(--_x);
  place-content: center;
  position: absolute;
  top: var(--_y);
  width: var(--_sz);
}

.clock-face time:nth-child(1) { --_d: 270deg; }
.clock-face time:nth-child(2) { --_d: 300deg; }
.clock-face time:nth-child(3) { --_d: 330deg; }
.clock-face time:nth-child(4) { --_d: 0deg; }
.clock-face time:nth-child(5) { --_d: 30deg; }
.clock-face time:nth-child(6) { --_d: 60deg; }
.clock-face time:nth-child(7) { --_d: 90deg; }
.clock-face time:nth-child(8) { --_d: 120deg; }
.clock-face time:nth-child(9) { --_d: 150deg; }
.clock-face time:nth-child(10) { --_d: 180deg; }
.clock-face time:nth-child(11) { --_d: 210deg; }
.clock-face time:nth-child(12) { --_d: 240deg; }

.day-text{
  position: absolute;
  font-size: 6cqi;
  color: #6f6f6f;
  bottom: 25cqi;
}
  .arm {
  background-color: var(--_abg);
  border-radius: calc(var(--_aw) * 2);
  display: block;
  height: var(--_ah);
  left: calc((var(--_w) - var(--_aw)) / 2);
  position: absolute;
  top: calc((var(--_w) / 2) - var(--_ah));
  transform: rotate(0deg);
  transform-origin: bottom;
  width: var(--_aw);
}
  .seconds {
  --_abg: #ff3f05;
  --_ah: 40cqi;
  --_aw: 1cqi;
  animation: turn 60s steps(60, end) infinite;
  animation-delay: var(--_ds, 0ms);
}
  .minutes {
  --_abg: #333;
  --_ah: 35cqi;
  --_aw: 2.5cqi;
  animation: turn 3600s steps(60, end) infinite;
  animation-delay: var(--_dm, 0ms);
}

.hours {
    --_abg: #333;
    --_ah: 30cqi;
    --_aw: 2.5cqi;
    animation: turn 43200s linear infinite; /* 60 * 60 * 12 */
    animation-delay: var(--_dh, 0ms);
      position: relative;
  }
.hours::before {
	background-color: #fff;
	border: 1cqi solid #333;
	border-radius: 50%;
	content: "";
	display: block;
	height: 4cqi;
	position: absolute;
	bottom: -3cqi;
	left: -1.75cqi;
	width: 4cqi;
}
            `}
            </style>
        </div>
    );
}

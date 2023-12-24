import React from "react";
import moment from "moment";
function Date({ dateObj, selectedDate, setselectedDate, size }: any) {
  const [currDate, currDayofWeek, currDateFotmat] = [
    dateObj.date(),
    dateObj.day(),
    dateObj.format("DD-MM-YYYY"),
  ];
  var defaultWeekdays = Array.apply(null, Array(7)).map(function (_, i) {
    return moment(i, "e").startOf("week").isoWeekday(i).format("ddd");
  });
  return (
    <div
      className={`flex flex-col gap-1 items-center justify-between ${size === 'LARGE' ? 'p-4' : 'p-2'} ${
        currDayofWeek === 6 || currDayofWeek === 0 ? "opacity-30" : ""
      }`}
    >
      <div className="uppercase">{defaultWeekdays[currDayofWeek]}</div>
      <div
        className={`${size === 'LARGE' ? 'h-[50px] w-[50px] text-2xl' : 'h-[25px] w-[25px] text-sm'} flex items-center justify-center  cursor-pointer ${
          selectedDate === currDateFotmat
            ? "bg-[#4472b8] text-white rounded-full"
            : "bg-transparent"
        }`
    }
    onClick={() => setselectedDate(dateObj.format('DD-MM-YYYY'))}
      >
        {currDate < 10 ? "0" + currDate : currDate}
      </div>
    </div>
  );
}

export default Date;

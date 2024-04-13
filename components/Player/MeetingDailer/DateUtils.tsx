function getCurrentTime() {
    const now = new Date();
    let hours:any = now.getHours();
    let minutes:any = now.getMinutes();
  
    
    // Add leading zero if single digit
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const currentTime = `${hours}:${minutes}`;
    return currentTime;
  }
function getCurrentHour() {
    const now = new Date();
    const currentHour = now.getHours();
  
    // If you want to ensure a two-digit format (e.g., 01, 02, ..., 09)
    const formattedHour = currentHour < 10 ? '0' + currentHour : currentHour.toString();
  
    return formattedHour;
}
function getCurrentTimePlusHours(hoursToAdd: number) {
  // Get the current time
  const now = new Date();

 // Add hours to the current time
 const futureTime = new Date(now.getTime() + (hoursToAdd * 60 * 60 * 1000));


  // Extract hours and minutes
  let hour:any = futureTime.getHours();
  let minute:any = futureTime.getMinutes();

  // Formatting: Ensure two digits for hour and minute
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  // Return the formatted time
  return {hour,minute};
}

function addMinutesToCurrentTime(minutesToAdd: number) {
  // Get the current time
  const now = new Date();

  // Add minutes to the current time
  const futureTime = new Date(now.getTime() + (minutesToAdd * 60 * 1000)); // Convert minutes to milliseconds

  // Extract hours and minutes from the future time
  let hour: any = futureTime.getHours();
  let minute: any = futureTime.getMinutes();

  // Formatting: Ensure two digits for hour and minute
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  // Return the formatted time
  return { hour, minute };
}


function getCurrentTimePlus1() {
    const now = new Date();
    let hours:any = now.getHours();
    let minutes:any = now.getMinutes();
  
    // Calculate the nearest 15-minute interval
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
  
    if (roundedMinutes === 60) {
      hours += 1;
      minutes = 0;
    } else {
      minutes = roundedMinutes;
    }
  
    // If adding 1 hour goes past 23, wrap around to 0 (midnight)
    if (hours >= 24) {
      hours = hours - 24;
    }
  
    // Add leading zero if single digit
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const currentTimeRounded = `${hours}:${minutes}`;
    return currentTimeRounded;
  
  }
  
  export {getCurrentTime,getCurrentHour,getCurrentTimePlus1,getCurrentTimePlusHours,addMinutesToCurrentTime}
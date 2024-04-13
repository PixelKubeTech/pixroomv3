export function getTimeSlots() {
  // Get the current time
  const currentTime = new Date();

  // Add 15 minutes
  const endTime = new Date(currentTime.getTime() + 15 * 60000); // 60000 ms in 1 minute

  // Update hhEnd and mmEnd with the new time
  let hhEnd = endTime.getHours().toString();
  let mmEnd = endTime.getMinutes().toString();

  // Add leading zeros if needed
  hhEnd = hhEnd.padStart(2, "0");
  mmEnd = mmEnd.padStart(2, "0");

  // If you want to update hhStart and mmStart based on the added 15 minutes
  const startTime = new Date(endTime.getTime() - 15 * 60000);
  let hhStart = startTime.getHours().toString();
  let mmStart = startTime.getMinutes().toString();

  // Add leading zeros if needed
  hhStart = hhStart.padStart(2, "0");
  mmStart = mmStart.padStart(2, "0");

  return {
    hhEnd,
    mmEnd,
    hhStart,
    mmStart,
  };
}

export function getTime({hhStart,mmStart,hhEnd,mmEnd}) {
  // Date string
  const dateString = new Date().toISOString();

  // Create a new Date object from the date string
  const dateObj = new Date(dateString);

  // Set hours and minutes from the provided values
  dateObj.setHours(parseInt(hhStart, 10)); // Assuming base 10 for parsing
  dateObj.setMinutes(parseInt(mmStart, 10)); // Assuming base 10 for parsing

  // Now dateObj holds the date with hhStart and mmStart
  console.log("Date with hhStart and mmStart:", dateObj.toISOString());

  // Create a new Date object from the date string
  const endDateObj = new Date(dateString);

  // Set hours and minutes for end time
  endDateObj.setHours(parseInt(hhEnd, 10)); // Assuming base 10 for parsing
  endDateObj.setMinutes(parseInt(mmEnd, 10)); // Assuming base 10 for parsing

  // Now endDateObj holds the date with hhEnd and mmEnd
  console.log("Date with hhEnd and mmEnd:", endDateObj.toISOString());
  return{
    startDateTime:dateObj.toISOString(),
    endDateTime:endDateObj.toISOString()
  }
}

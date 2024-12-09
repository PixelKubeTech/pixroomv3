export function addOneDay(dateString: string, blnformatdate: boolean = false): { startOfDay: string, endOfDay: string, currentTime: string } {
  let day: number, month: number, year: number;

  // Determine if the format is YYYY-MM-DD or DD-MM-YYYY
  if (dateString.indexOf('-') === 4) {
    // Format is YYYY-MM-DD
    [year, month, day] = dateString.split('-').map(Number);
  } else {
    // Format is DD-MM-YYYY
    [day, month, year] = dateString.split('-').map(Number);
  }

  // Create a date object for the given date
  const date = new Date(Date.UTC(year, month - 1, day)); 

  // Create a date object for the current time
  const currentTime = new Date();

  // Format the dates in YYYY-MM-DDTHH:mm:ss.sssZ
  const formatDate = (date: Date, hours: number, minutes: number, seconds: number): string => {
    const yearStr = date.getUTCFullYear();
    const monthStr = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero indexed, so add 1
    const dayStr = String(date.getUTCDate()).padStart(2, '0');
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    const milliseconds = "000";

    return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}:${secondsStr}.${milliseconds}Z`;
  }

 

  const formatCurrentDate = (date: Date): string => {
    const yearStr = date.getUTCFullYear();
    const monthStr = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dayStr = String(date.getUTCDate()).padStart(2, '0');
    const hoursStr = String(date.getUTCHours()).padStart(2, '0');
    const minutesStr = String(date.getUTCMinutes()).padStart(2, '0');
    const secondsStr = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

    return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}:${secondsStr}.${milliseconds}Z`;
  }

  return {
    startOfDay: formatDate(date, 0, 0, 0),
    endOfDay: formatDate(date, 23, 59, 0),
    currentTime: formatCurrentDate(currentTime)
  };
} 
export const formatCurrentDateLocal = (date: Date): string => {
  const yearStr = date.getFullYear(); // Local year
  const monthStr = String(date.getMonth() + 1).padStart(2, '0'); // Local month
  const dayStr = String(date.getDate()).padStart(2, '0'); // Local day
  const hoursStr = String(date.getHours()).padStart(2, '0'); // Local hours
  const minutesStr = String(date.getMinutes()).padStart(2, '0'); // Local minutes
  const secondsStr = String(date.getSeconds()).padStart(2, '0'); // Local seconds
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // Local milliseconds

  return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}:${secondsStr}.${milliseconds}`;
};
export const getCurrentDate1 = () => {
  return new Date().toISOString().split('T')[0]
}
export const getCurrentDate = (): string => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export const reverseDate = (date: string | null) => {
  if (!date) return ''
  const parts = date.split('-')
  if (parts.length !== 3) return date
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

function getCurrentDateFormat() {
  const currentDate = new Date()

  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const year = currentDate.getFullYear()

  return `${month}/${day}/${year}`
}
export function getStartEndOfMonth() {
  const dateString = getCurrentDateFormat()
  // Split the input date string into month, day, and year
  const [month, day, year] = dateString.split('/')

  // Create a new Date object for the input date
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  // Get the first day of the month
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)

  // Get the last day of the month
  const nextMonth: any = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  const endOfMonth = new Date(nextMonth - 1)

  // Format the dates as MM/DD/YYYY
  const startStr = formatDate(startOfMonth)
  const endStr = formatDate(endOfMonth)

  return [startStr, endStr]
}

// Helper function to format date as MM/DD/YYYY
export function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function getCurrentMinutesPlus30() {
  // Get current date and time
  let currentDate = new Date()

  // Add 30 minutes
  currentDate.setMinutes(currentDate.getMinutes() + 15)

  // Get the minutes
  let minutes = currentDate.getMinutes()

  return minutes
}

export function getDifferenceInMinutes(startDateStr: string, endDateStr: string): number {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime()

  const differenceInMinutes = differenceInMilliseconds / 1000 / 60

  return differenceInMinutes
}
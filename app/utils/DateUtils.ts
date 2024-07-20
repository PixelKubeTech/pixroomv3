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

export function addOneDay(dateString: string, blnformatdate: boolean = false): string {
  let day: number, month: number, year: number;

  // Determine if the format is YYYY-MM-DD or DD-MM-YYYY
  if (dateString.indexOf('-') === 4) {
    // Format is YYYY-MM-DD
    [year, month, day] = dateString.split('-').map(Number);
  } else {
    // Format is DD-MM-YYYY
    [day, month, year] = dateString.split('-').map(Number);
  }

  const newDate = new Date(year, month - 1, day); 
  // Adjust the date by adding one day
  if (!blnformatdate) {
    newDate.setDate(newDate.getDate() + 1);
  }

  // Format the date in YYYY-MM-DDTHH:mm:ss.sssZ
  const yearStr = newDate.getFullYear();
  const monthStr = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so add 1
  const dayStr = String(newDate.getDate()).padStart(2, '0');
  const hours = String(newDate.getUTCHours()).padStart(2, '0');
  const minutes = String(newDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(newDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(newDate.getUTCMilliseconds()).padStart(3, '0');

  const isoString = `${yearStr}-${monthStr}-${dayStr}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return isoString;
}

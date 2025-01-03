export interface BookingDetails {
    duration: number; // Duration in hours
    meetingName: string; // Name of the meeting
    startTime: Date; // Start time as a Date object
    endTime: Date; // End time as a Date object
    from: string; // Start time in a formatted string (e.g., HH:mm)
    to: string; // End time in a formatted string (e.g., HH:mm)
    from1: number; // Start time as a timestamp
    to2: number; // End time as a timestamp
    bookingPersonName: string; // Email of the booking person
    sourceEventId: string; // Source event ID
    noOfAttendees: number; // Number of attendees
    notes: string; // Notes or meeting summary
  }
  
 export interface IEvent {
    isAvailable: boolean; // Availability flag
    date: string; // Formatted date string (e.g., DD-MM-YYYY)
    bookingDetails: BookingDetails; // Details of the booking
  }
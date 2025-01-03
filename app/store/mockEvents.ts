import { IEvent, BookingDetails } from "@/app/interface/EventType"; // Adjust the import path as needed

export const generateTwoDayMockEvents = (): IEvent[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // Midnight today
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Midnight tomorrow

  const events: IEvent[] = [];

  // Helper to format time to HH:mm
  const formatTime = (date: Date) => date.toTimeString().slice(0, 5);

  // Helper to generate events for a single day
  const generateEventsForDay = (startDay: Date) => {
    let currentTime = new Date(startDay.getTime());
    const endTime = new Date(startDay.getTime() + 24 * 60 * 60 * 1000); // End of the day

    while (currentTime < endTime) {
      const meetingStartTime = new Date(currentTime);
      const meetingEndTime = new Date(meetingStartTime.getTime() + 10 * 60 * 1000); // 10 minutes meeting

      if (meetingEndTime > endTime) break;

      const bookingDetails: BookingDetails = {
        duration: 10 / 60, // Duration in hours
        meetingName: `Meeting ${meetingStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        startTime: meetingStartTime,
        endTime: meetingEndTime,
        from: formatTime(meetingStartTime),
        to: formatTime(meetingEndTime),
        from1: meetingStartTime.getTime(),
        to2: meetingEndTime.getTime(),
        bookingPersonName: "user@example.com",
        sourceEventId: `event-${meetingStartTime.toISOString()}`,
        noOfAttendees: Math.floor(Math.random() * 10) + 1, // Random number of attendees between 1 and 10
        notes: "Mock meeting for UI testing",
      };

      events.push({
        isAvailable: false,
        date: `${meetingStartTime.getDate()}-${meetingStartTime.getMonth() + 1}-${meetingStartTime.getFullYear()}`,
        bookingDetails,
      });

      currentTime = new Date(meetingEndTime.getTime() + 10 * 60 * 1000); // Skip 10 minutes of free time
    }
  };

  // Generate events for today and tomorrow
  generateEventsForDay(today);
  generateEventsForDay(tomorrow);

  return events;
};
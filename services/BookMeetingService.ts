import axios from "axios";

const API_BASE_URL = "http://3.94.231.14:3001/api";

class Meeting {
  spaceId: number;
  noOfAttendees: number;
  buildingId: number;
  orgId: number;
  floorId: number;
  alldays: boolean;
  reminder: number;
  startDateTime: string;
  endDateTime: string;
  meetingName: string;
  participants: string;
  notes: string;

  constructor(
    spaceId: number = 0,
    buildingId: number = 0,
    orgId: number = 0,
    startDateTime: string = "",
    endDateTime: string = "",
    meetingName: string = "",
    participants: string = "",
    notes: string = ""
  ) {
    this.spaceId = spaceId;
    this.noOfAttendees = 300;
    this.buildingId = buildingId;
    this.orgId = orgId;
    this.floorId = 31;
    this.alldays = false;
    this.reminder = 0;
    this.startDateTime = this.convertToISODateTime(startDateTime);
    this.endDateTime =  this.convertToISODateTime(endDateTime);
    this.meetingName = meetingName;
    this.participants = participants;
    this.notes = notes;
  }

  private convertToISODateTime(timeString:string):string{
    const date = new Date();
    const [currentDate] = date.toISOString().split('T')
    const [hours, minutes] = timeString.split(":");
   // const [time, period] = minutes.split(" ");
    const parsedDate = `${currentDate}T${timeString}:00Z`
   console.log('parsedDate',parsedDate)
    return parsedDate;
  }
}

class Parking {
  parkingId: number = 0;
  meetingId: number = 0;
  participantName: string = "";
  participantId: number = 0;
  vechicleNumber: string = "";
  slotId: number = 0;
  slotName: string = "";

  constructor(
    parkingId: number = 0,
    meetingId: number = 0,
    participantName: string = "",
    participantId: number = 0,
    vechicleNumber: string = "",
    slotId: number = 0,
    slotName: string = ""
  ) {
    this.parkingId = parkingId;
    this.meetingId = meetingId;
    this.participantName = participantName;
    this.participantId = participantId;
    this.vechicleNumber = vechicleNumber;
    this.slotId = slotId;
    this.slotName = slotName;
  }
}

class Service {
  meetingId: number = 0;
  serviceId: number = 0;
  serviceCount: number = 0;
  action: string = "";

  constructor(
    meetingId: number,
    serviceId: number,
    serviceCount: number,
    action: string
  ) {
    this.meetingId = meetingId;
    this.serviceId = serviceId;
    this.serviceCount = serviceCount;
    this.action = action;
  }
}
interface BookingResponse {
  status: Boolean;
  error: any;
  result: any;
}

async function bookMeeting(request) {
  try {
    let bookingUrl = `${API_BASE_URL}/SMSService/BookMeeting`;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response: any = await axios.post(bookingUrl, request, config);
    console.log('response.data',response.data);
    return {
      success: true,
      result: {
        serverity:"success",
        code: 200,
        message:`Successfully booked for ${response.data.data.meeting.referenceNumber}`
      },
    };
    //return response;
  } catch (e: any) {
    return {
      success: false,
      result: {
        serverity:"error",
        code: 500,
        message:`Booking failed! Please retry!`
      },
    };
  }
}

export { bookMeeting, Meeting, Parking, Service };

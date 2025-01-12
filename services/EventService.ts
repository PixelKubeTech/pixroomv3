import { addOneDay, formatCurrentDateLocal, getCurrentDate, reverseDate } from '@/app/utils/DateUtils'

import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const API_BASE_URL = apiUrl? apiUrl + '/api/pixconnectors':'/api/pixconnectors';

const getTime = (time) => time.substring(11,16)

async function processMeetingInfo(result) {
    try {
        const mappedData = result.data.map(item => {
            const organiser = item.attendees.filter(attendee => attendee.isOrganizer);
            let response = {
                isAvailable: false,
                date: reverseDate(item.startTime.split('T')[0]), // Ensure reverseDate is defined
                bookingDetails: {
                    duration: 2,
                    meetingName: item.summary,
                    from: getTime(item.startTime), // Ensure getTime is defined
                    to: getTime(item.endTime), // Ensure getTime is defined
                    from1: new Date(item.startTime).getTime(), // Convert to timestamp
                    to2: new Date(item.endTime).getTime(),
                    bookingPersonName: organiser.length == 1? organiser[0].email: "" ,
                    sourceEventId:item.sourceEventId,
                    noOfAttendees:item.attendees.length,
                    notes:item.summary
                    
                }
            }
            return response;
        });
        mappedData.sort((a, b) => {
            return a.bookingDetails.from1 - b.bookingDetails.from1 || a.bookingDetails.to2 - b.bookingDetails.to2;
        });
        return Promise.resolve(mappedData);
    } catch (e: any) {
        return Promise.reject({
            "success": false,
            "errors": {
                "code": "500",
                "message": e.message
            },
            "result": []
        });
    }
}
async function getEventInstances(request){
    try{
      
        let {calendarId='',startTime='',endTime, currentTime} = request
        let currentDate = getCurrentDate()
        const result1 = addOneDay(currentDate);
        startTime =  result1.startOfDay ;
        let endTime1 = result1.endOfDay;

        if (endTime !== null){
            endTime1 = endTime.toISOString();
        }
        currentTime = formatCurrentDateLocal(new Date())
        let result = await axios.get(`${API_BASE_URL}/event/getinstances?calendarId=${calendarId}&startTime=${startTime}&endTime=${endTime1}`)
        let meetingInfo = await processMeetingInfo(result)
        return meetingInfo
    }catch(e:any){
        return {
            "success":false,
            "errors":{
                "code":"500",
                "message":e.message
            },
            "result":[]
        }
    }
}

export {getEventInstances, processMeetingInfo, API_BASE_URL}
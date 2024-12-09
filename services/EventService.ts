import { addOneDay, getCurrentDate, reverseDate,formatCurrentDateLocal } from '@/app/utils/DateUtils'
import axios from 'axios'

const API_BASE_URL = 'https://demo.pixelkube.io/api/pixconnectors'

const getTime = (time) => time.substring(11,16)

async function processMeetingInfo(result) {
    try {
        const mappedData = result.data.map(item => {
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
                    bookingPersonName: item.attendees[0]?.email ?? '',
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
        endTime = result1.endOfDay;
        currentTime = formatCurrentDateLocal(new Date())
        let result = await axios.get(`${API_BASE_URL}/event/getinstances?calendarId=${calendarId}&startTime=${currentTime}&endTime=${endTime}`)
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

export {getEventInstances}
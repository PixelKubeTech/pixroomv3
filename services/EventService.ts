import { reverseDate } from '@/app/utils/DateUtils'
import axios from 'axios'

const API_BASE_URL = 'https://demo.pixelkube.io/api/pixconnectors'

const getTime = (time) => time.substring(11,16)

async function processMeetingInfo(result){
    try{
        return Promise.resolve(result.data.map(item=>{
            let response = {
             isAvailable: false,
             date: reverseDate(item.startTime.split('T')[0]),
             bookingDetails:{
                duration:2,
                meetingName:item.summary,
                 from:getTime(item.startTime),
                 to:getTime(item.endTime),
                 bookingPersonName:item.attendees[0]?.email ?? ''
             }
            } 
            return response
         }))
    }catch(e){
        return Promise.reject({})
    }
}
async function getEventInstances(request){
    try{
        let {calendarId='',startTime='',endTime} = request
        let result = await axios.get(`${API_BASE_URL}/event/getinstances?calendarId=${calendarId}&startTime=${startTime}&endTime=${endTime}`)
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
import { reverseDate } from '@/app/utils/DateUtils'
import axios from 'axios'

const API_BASE_URL = 'http://3.94.231.14:3001/api/SMSService'


async function getDeviceInfo(request) {
    try {
        let result = await axios.get(`${API_BASE_URL}/PlayerManagement/${request.serialNumber}`)
        console.log('getDevice', result)
        return {

            "success": true,
            "errors": [],
            "result": result.data.data

        }
    } catch (e: any) {
        console.log('error', e.message)
        return {

            "success": false,
            "errors": [{
                "code": "500",
                "message": e.message
            }],
            "result": null

        }
    }
}

export { getDeviceInfo }
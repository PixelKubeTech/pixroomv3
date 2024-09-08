import { reverseDate } from '@/app/utils/DateUtils'
import axios from 'axios'

const API_BASE_URL = 'https://demo.pixelkube.io/api/SMSService'


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

async function getSpaceDetails(request) {
    try {
        let result = await axios.get(`${API_BASE_URL}/Spaces/${request.spaceid}`)
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

export { getDeviceInfo, getSpaceDetails}
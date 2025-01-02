import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api'


async function getSpaceInfo(request){
    try{
        let {spaceId} = request
        let result = await axios.get(`${API_BASE_URL}/SMSService/Spaces/${spaceId}`)
        let spaceInfo = result.data
        return spaceInfo
    } catch(e:any){
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

export {getSpaceInfo}
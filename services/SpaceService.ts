import axios from 'axios'

const API_BASE_URL = 'http://3.94.231.14:3001/api'


async function getSpaceInfo(request){
    try{
        let {spaceId} = request
        let result = await axios.get(`${API_BASE_URL}/SMSService/Spaces/${spaceId}`)
        let spaceInfo = result.data
        return spaceInfo
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

export {getSpaceInfo}
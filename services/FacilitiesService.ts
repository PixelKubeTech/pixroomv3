import axios from 'axios'

const API_BASE_URL = 'http://3.94.231.14:3001/api'


async function getFacilitiesByOrgId(request){
    try{
        let {orgId} = request
        let result = await axios.get(`${API_BASE_URL}/SMSService/Facilities/getByOrganization/${orgId}`)
        // if no facilities is configured by default chair, wifi will be available
        let facilities = result.data ? result.data.data.map(item=>item.resources).map(([facilities])=>facilities.name.toLowerCase()) : ['chair','wifi']
        return ({
            ...result.data,
            "facilities":facilities
        })
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

export {getFacilitiesByOrgId}
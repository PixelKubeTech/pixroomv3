import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = apiUrl? apiUrl + '/api': "/api";


async function getFacilitiesByOrgId(request){
    try{
        let {orgId} = request
        let result = await axios.get(`${API_BASE_URL}/SMSService/Facilities/getByOrganization/${orgId}`)
        // if no facilities is configured by default chair, wifi will be available
        let facilities = result.data ? result.data.data.flatMap(item => item.resources) // Flatten the nested arrays
                                                        .filter(resource => resource && resource.name) // Filter out empty or undefined resources
                                                        .map(resource => resource.name.toLowerCase()) : 
                                                        ['chair', 'wifi'];
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
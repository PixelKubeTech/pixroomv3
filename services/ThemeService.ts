import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = apiUrl?apiUrl + '/api':"/api";

async function getThemesById(request){
    try{
        let {Id} = request
        let result = await axios.get(`${API_BASE_URL}/SMSService/Theme/GetById?id=${Id}`);
        let themeInfo:any=null;
        if(result!=null && result.data!=null && result.data.data!=null)
        {
            themeInfo = result.data.data;
        }
        return themeInfo;
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

export {getThemesById}
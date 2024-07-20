import axios from 'axios'
const API_BASE_URL = 'https://demo.pixelkube.io/api'

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
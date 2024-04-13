import axios from "axios";

const API_BASE_URL = "http://3.94.231.14:3001/api";

interface BookingResponse {
  status: Boolean;
  error: any;
  result: any;
}

async function getReportFault(){

}

async function saveReportFault(requestBody) {
  try {
    let reportFault = `${API_BASE_URL}/ReportFault`;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response: any = await axios.post(reportFault, requestBody, config);
    console.log('response.data',response.data);
    return {
      success: true,
      result: {
        serverity:"Success",
        code: 200,
        message:`Fault Reported`
      },
    };
    //return response;
  } catch (e: any) {
    return {
      success: false,
      result: {
        serverity:"Error",
        code: 500,
        message:`Failed to report fault! Please retry!`
      },
    };
  }
}

export { saveReportFault, getReportFault };

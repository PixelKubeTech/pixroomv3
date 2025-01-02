import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = apiUrl? apiUrl + "/api": "/api";

async function getFindRoomDetails(request) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let result = await axios.post(
      `${API_BASE_URL}/SMSService/Spaces/FindRooms`,
      request,
      config
    );
    return result.data.data;
  } catch (e: any) {
    throw {
      success: false,
      errors: {
        code: "500",
        message: e.message,
      },
      result: [],
    };
  }
}

export { getFindRoomDetails };

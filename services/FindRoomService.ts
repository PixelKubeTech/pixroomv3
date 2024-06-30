import axios from 'axios'

const API_BASE_URL = 'https://demo.pixelkube.io/api'

async function getFindRoomDetails(request) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let result = await axios.post(`${API_BASE_URL}/SMSService/Spaces/FindRooms`, request, config)
    return result.data
  } catch (e: any) {
    return {
      success: false,
      errors: {
        code: '500',
        message: e.message,
      },
      result: [],
    }
  }
}

export { getFindRoomDetails }

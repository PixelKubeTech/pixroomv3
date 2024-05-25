export const ADD_DEVICE = `
mutation addDevice($request: PlayerManagementRequest) {
  createPlayerDevice(request: $request) {
    data {
      serialNumber
      deviceName
    }
    statusCode
    status
    message
  }
}

`

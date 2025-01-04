
export interface IErrorInfo{
    code:string;
    message:string;
  }
  export  interface Device{
    serialNumber: string;
    deviceName: string;
    ipAddress: string;
    department: string;
    locationName: string;
    contactPerson: string;
    resolution: string;
    spaceName: string;
    theme: string;
    orientation: string;
    deviceStatus: number;
    spaceId: number;
    connectorId: string;
    calendarId: string;
  }
  export interface IDevice{
    result:Device | null
    errorInfo: IErrorInfo | null
  }
  export interface IResponse {
    success: boolean;
    errors: IErrorInfo[];
    result: Device;
  }
  export interface IAddDeviceProps {
    macAddress: string | null
    code: string | null
    deviceInfo: Device | null
    errorInfo: IErrorInfo | null
  }


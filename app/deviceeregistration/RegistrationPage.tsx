'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Provider, useMutation } from 'urql'
import client from '../urql.client'
import Button from '@mui/material/Button'
import { ADD_DEVICE } from './queries'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import {IErrorInfo,IAddDeviceProps,IDevice} from './SettingsInterface'
function RandomDigits(props:IDevice) {
  const searchParams = useSearchParams()
  const macAddress = searchParams.get('macaddress')
  const [code, setCode] = React.useState<string | null>('------')
  const generateRandomSixDigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }
  React.useEffect(() => {
    setCode(generateRandomSixDigitCode())
  }, [])

  return (
    <React.Fragment>
      <Provider value={client}>
        <div className="text-5xl font-bold flex items-center color-[#58968b]">
          Device ID : {macAddress}
        </div>
        {code !== null && (
          <div className="text-5xl font-bold flex items-center">
            Code :{' '}
            {code.split('').map((data, idx) => (
              <div key={`${idx}`} className="text-5xl bold border-2 m-2 p-2 rounded-lg">
                {data}
              </div>
            ))}
          </div>
        )}
        <AddDevice macAddress={macAddress} code={code} deviceInfo={props.result} errorInfo={props.errorInfo}/>
      </Provider>
    </React.Fragment>
  )
}


const AddDevice = (props: IAddDeviceProps) => {
  const [playerResult, addDevice] = useMutation(ADD_DEVICE)
  const [openSuccess, setOpenSuccess] = React.useState(props.errorInfo?.code ? true : false)
  const [openError, setOpenError] = React.useState(false)
  const searchParams = useSearchParams()
  const [message, setMessage] = React.useState<string>(props.errorInfo?.message ?props.errorInfo?.message:"" )

  let variable = {
    request: {
      contactPerson: "Kishore",
      department: "Research",
      deviceName: "Mobile",
      deviceStatus: 1,
      ipAddress: "192.168.1.5",
      locationName: props.code,
      orientation: "",
      resolution: "1920 x 1080 (Full HD)",
      serialNumber: props.macAddress,
      spaceName: null,
      theme: "6",
    },
  };

  let handleAddDevice = () => {
    addDevice(variable)
      .then((result) => {
        console.log(result.data.createPlayerDevice.statusCode)
        if (result.data.createPlayerDevice.statusCode === 200) {
          setOpenSuccess(true)
          setMessage('Device Added Successfully')
        } else {
          setOpenError(true)
          setMessage('Error while adding device')
        }
      })
      .catch((error) => {
        setOpenError(true)
        setMessage('Error while adding device')
      })
  }
  React.useEffect(() => {
    console.log(playerResult)
  }, [playerResult])
  return (
    <div>
      <div className="mt-10">
        <Button size="large" variant="outlined" onClick={handleAddDevice}>
          Add Device
        </Button>
      </div>
      <Snackbar open={openSuccess} autoHideDuration={5000}>
        <Alert severity="info" variant="filled" sx={{ width: '100%' }}>
          <AlertTitle>{props.errorInfo?.code ? props.errorInfo?.code : "Success"}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={5000}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <AlertTitle>Failed</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default RandomDigits

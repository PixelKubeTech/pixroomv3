'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import {CircularProgress} from '@mui/material'
import RandomDigits from './RandomDigits';
import {DeviceService} from '../../services'
import { useSearchParams } from 'next/navigation'
import { IErrorInfo,IResponse } from './SettingsInterface';

function Settings(props: { macAddress: string }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const macAddress = searchParams.get('macaddress')
  let [result,setResult] = React.useState(null)
  let [loading,setLoading] = React.useState(true)
  let [errorInfo,setErrorInfo] = React.useState<IErrorInfo>({
    "code":"",
    "message":""
  })
  React.useEffect(() => {
    // Function to fetch data and handle redirection
   

    const fetchData = async () => {
      try {
        // Fetch data from the provided route
        const serialResponse:IResponse = await DeviceService.getDeviceInfo({serialNumber:macAddress?macAddress:''});
        console.log('serialResponse',serialResponse)
        if (serialResponse.success) {
          console.log('spaceId',serialResponse?.result.spaceId)
          router.push(`/meeting?spaceId=${serialResponse.result.spaceId}`)
          setLoading(false)
        }else if(!serialResponse.success){
          setLoading(false)
          setErrorInfo((error)=>({
            ...error,
            code:"Space Id not assigned",
            message:"No device assigned to serial number"
          }))
          
        }else{
          console.log('serialResponse',serialResponse)
          setLoading(false)
          setErrorInfo((error)=>({
            ...error,
            code:"Error",
            message:"No device found"
          }))
        }
      } catch (error) {
        setLoading(false)
        setResult(null)
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      {
        loading ? <CircularProgress/>:  <RandomDigits result={result} errorInfo={errorInfo}/>
      }
      
    
    </div>
  )
}



export default Settings

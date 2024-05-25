import React from 'react'
import Devices from '../Devices'
import { FindRoomService } from '@/services'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  CircularProgress,
} from '@mui/material'
import {getDifferenceInMinutes} from '../../../app/utils/DateUtils'
function FindRoomTable() {
  let [rooms, setRooms] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    let fetchRooms = async () => {
      try {
        let roomsResponse = await FindRoomService.getFindRoomDetails({
          startDate: '2024-05-11 05:24:17',
          endDate: '2024-05-11 05:24:17',
          orgId: 44,
          buildingId: 34,
          floorId: 43,
        })
        // console.log('rooms', roomsResponse)
        if (roomsResponse.statusCode === 200) {
          setRooms(roomsResponse.data)
          setLoading(false)
        } else {
          setRooms([])
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  if (loading) {
    return (
      <div className="max-h-[380px] overflow-auto mt-6">
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="max-h-[380px] overflow-auto mt-6">
        <TableContainer component={Paper}>
          <Table className="p-4" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Meeting Room</TableCell>
                <TableCell className="font-bold">Available for (time)</TableCell>
                <TableCell className="font-bold">Facilities</TableCell>
                <TableCell className="font-bold">Building Name</TableCell>
                <TableCell className="font-bold">Address</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((roomDetails:FindRoom, idx) => (
                <TableRow
                  key={idx}
                  style={{ backgroundColor: idx % 2 === 0 ? 'slategray' : 'white' }}
                >
                  <TableCell component="th" scope="row">
                    <div
                      className={`h-[25px] w-[25px] ${
                        idx % 2 === 0 ? 'bg-[#ff544f]' : 'bg-[#58968b]'
                      } rounded-full mr-2`}
                    ></div>
                    {roomDetails.spaceName}
                  </TableCell>
                  <TableCell>Available for {getDifferenceInMinutes(roomDetails.endDate,roomDetails.startDate)} mins</TableCell>
                  <TableCell> {roomDetails.facilityName}</TableCell>
                  <TableCell>{roomDetails.buildingName}</TableCell>
                  <TableCell>{roomDetails.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default FindRoomTable

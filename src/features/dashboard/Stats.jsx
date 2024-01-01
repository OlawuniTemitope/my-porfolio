import { formatCurrency } from "../../utils/helpers"
import Stat from "./Stat"
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2'

function Stats({bookings,confirmStays,numDays,cabinCount}) {
    const newBookings = bookings.length
    const sales =bookings.reduce((acc,cur)=>acc+cur.totalPrice,0)
    const checkIn=confirmStays.length
    const occupation=confirmStays.reduce((acc,cur)=>acc+cur.numNight,0)/(numDays*cabinCount)
    return (
        <>
          <Stat title='Bookings' value={newBookings}
           icon={<HiOutlineBriefcase/>} color='blue'/>
          <Stat title='sale' value={formatCurrency(sales)}
           icon={<HiOutlineBanknotes/>} color='green'/>
          <Stat title='Check ins' value={checkIn}
           icon={<HiOutlineCalendarDays/>} color='indigo'/>
          <Stat title='Ocuupancy Rate' value={`${Math.round(occupation*100)}%`}
           icon={<HiOutlineChartBar/>} color='yellow'/>
          </>
    )
}

export default Stats

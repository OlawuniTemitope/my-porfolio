
import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import useQueryData from "../cabins/useQueryData";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivities from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {isLoading, bookings}=useRecentBooking()
  const{isLoading:isLoading1,numDays,confirmStays}=useRecentStays()
  const {isLoading:isLoading2,cabins}=useQueryData()

  if (isLoading || isLoading2 || isLoading1) return <Spinner/>
  // console.log(bookings)
  
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} 
      confirmStays ={confirmStays}
      numDays={numDays}
      cabinCount={cabins.length} />
      <TodayActivities/>
      <DurationChart confirmedStays={confirmStays}/>
      <SalesChart bookings ={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import {Button} from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [addBreakFast,setAddBreakFast]=useState(false)
  const [confirmedPaid, setConfirmedPaid]=useState(false)

  const moveBack = useMoveBack();

  const {settings,isLoading:isLoadingSettings} =useSettings()
  const {booking,isLoading} =useBooking()

  useEffect(()=>setConfirmedPaid(booking?.isPaid ??  false),[booking])
  // console.log(booking)
  const {checkin,isCheckingIn}=useCheckin()
 
  if(isLoading|| isCheckingIn || isLoadingSettings) return <Spinner/>

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuest,
    hasBreakFast,
    numNight,
  } = booking;
  const optionalBreakFast =
   settings.breakFastPrice * numGuest * numNight
    console.log(booking)
  function handleCheckin() {
    if(!confirmedPaid) return;

    if(addBreakFast){
      checkin({bookingId,breakfast:{
        hasBreakFast:true,
        extraPrice:optionalBreakFast,
        totalPrice:optionalBreakFast + totalPrice
      },})
    } else {
    checkin({bookingId,breakFast:{}})
  }
}
   console.log(totalPrice,optionalBreakFast)
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakFast && (<Box>
        <Checkbox checked={addBreakFast}
        onChange={()=>{
          setAddBreakFast(breakFast=> !breakFast)
          setConfirmedPaid(false)
          }}
          id='breakFast'
          >
            want to add breakfast for {optionalBreakFast}?
          </Checkbox>
      </Box>)
}      <Box>
        <Checkbox checked={confirmedPaid}
        disabled ={confirmedPaid || isCheckingIn}
        id='confirmed'
         onChange={()=>setConfirmedPaid(confirmedPaid=>confirmedPaid=!confirmedPaid)}>
          i confirm that that {guest.fullName} has 
          paid a total amount of {!addBreakFast?formatCurrency(totalPrice) :
          `${formatCurrency(totalPrice + optionalBreakFast)} 
           (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakFast)})`
          
          }          
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmedPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
          </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

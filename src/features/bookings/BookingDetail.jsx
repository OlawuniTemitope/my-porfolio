import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";

import ButtonGroup from "../../ui/ButtonGroup";
import {Button} from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import {  HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {deleteBooking,isDeleting,} =useDeleteBooking()
  const {checkOut,isCheckingOut}=useCheckOut()

  const {booking,isLoading} =useBooking()
  const navigate = useNavigate()
  
  
  const moveBack = useMoveBack();
  if(isLoading) return <Spinner/>
  if(!booking) return <Empty resourceName='booking'/>
  console.log(booking)
  const {status,id:bookingId} =booking
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking # {bookingId} </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      {status === 'unconfirmed' &&
             ( <Button 
              onClick={()=>navigate(`/checkIn/${bookingId}`)}>
                Check in
              </Button>)}

              {status === 'checked-in' &&
             ( <Button icon={HiArrowUpOnSquare}
              onClick={()=>checkOut(bookingId)}
              disabled={isCheckingOut}
              >
                Check Out
              </Button>)}
              <Modal> 
                <Modal.Open Opens='delete'>
                  <Button variation='danger'>
                    Delete Booking
                  </Button>
                </Modal.Open>             
                <Modal.Window name='delete'>
                  <ConfirmDelete resourceName='booking' 
                  disabled={isDeleting}
                   onConfirm={()=> deleteBooking(bookingId,{onSettled:()=> navigate(-1)})}/>
                </Modal.Window>
              </Modal>


        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
 export  function useCheckin(){
    const querryclient =useQueryClient()
    const navigate =useNavigate()
    const {mutate:checkin,isLoading:isCheckingIn}=useMutation(
        {mutationFn: ({bookinId,breakfast})=>
         updateBooking(bookinId,{
            status:'checked-in',
            isPaid:true,
            ...breakfast
        }),
        
        onSuccess:(data)=>{toast.success(`Booking # ${data.id} 
        successfully checked in`);
        querryclient.invalidateQueries({active:true});
        navigate('/') 
    },
    onError: ()=>toast.error('There was an error when checking in')
       }
    )

    return {checkin,isCheckingIn}
}
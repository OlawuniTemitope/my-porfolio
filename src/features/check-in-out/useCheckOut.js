import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

 export  function useCheckOut(){
    const querryclient =useQueryClient()
    
    const {mutate:checkOut,isLoading:isCheckingOut}=useMutation(
        {mutationFn: (bookinId)=>
         updateBooking(bookinId,{
            status:'checked-out',
        
        }),
        
        onSuccess:(data)=>{toast.success(`Booking # ${data.id} 
        successfully checked in`);
        querryclient.invalidateQueries({active:true});
        
    },
    onError: ()=>toast.error('There was an error when checking in')
       }
    )

    return {checkOut,isCheckingOut}
}
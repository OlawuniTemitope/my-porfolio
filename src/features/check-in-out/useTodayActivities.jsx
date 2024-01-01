import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivities(){
    const {isLoading,data:activities}= useQuery({
        queryFn:getStaysTodayActivity,
        queryKey:['bookings']
    })
    console.log(activities)
    return {activities,isLoading}
}
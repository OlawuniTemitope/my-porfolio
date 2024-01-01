import { useMutation, useQueryClient } from "@tanstack/react-query"
import{ Logout as logOutApi} from "./../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useLogout() {
    const navigate = useNavigate()
    const queryClient =useQueryClient()
    const {mutate:logout,isLoading:isLoggingOut}=useMutation({
        mutationKey:['logOut'],
        mutationFn: logOutApi,
        onSuccess:()=>{
            queryClient.removeQueries()
            navigate('/login',{replace:true})
            toast.success('Logout successful')
        }
    })
    return  {logout,isLoggingOut}
}

export default useLogout

import { useMutation } from "@tanstack/react-query"
import apiAuth from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function useLogin() {
    const navigate=useNavigate()
    const{mutate:login,isLoading} = useMutation({
        mutationFn:({email,password})=>
        apiAuth({email,password}),
        onSuccess:(data)=>{
            console.log(data)
            navigate('/dashboard',{replace:true})},
        onError:(err)=>{
            console.log(err)
            toast.error('Provided email or password are incorrect')
        }
    })
    return {login,isLoading}
}

export default useLogin
 
import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../services/apiAuth"
import toast from "react-hot-toast"

function useSignUp() {
const {mutate:signUps,isLoading}=useMutation({
    mutationFn:signUp,
    onSuccess:(user)=>{
        console.log(user)
        toast.success(`Account was successfully created please verify
        the new account from the user's email address`)
    }
}

)


    return {signUps,isLoading}
}

export default useSignUp

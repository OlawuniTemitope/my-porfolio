import ButtonIcon from "../../ui/ButtonIcon"
import {HiArrowRightOnRectangle} from 'react-icons/hi2'
import useLogout from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini"
export function LogOut() {
    const {logout,isLoggingOut}=useLogout()
    return <ButtonIcon disabled={isLoggingOut} onClick={logout}>
        {!isLoggingOut?< HiArrowRightOnRectangle/>:<SpinnerMini/>}
          </ButtonIcon>
}


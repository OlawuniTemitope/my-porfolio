import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { LogOut } from "../features/authentication/LogOut"
import DarkmodeToggle from "./DarkmodeToggle"

const HeaderMenuStyle=styled.ul`
    display: flex;
    gap: 0.3rem;
`
function HeaderMenuComponent() {
    const navigate =useNavigate()
    return (
        <HeaderMenuStyle>
            <li>
                <ButtonIcon onClick={()=>navigate('/account')}>
                    <HiOutlineUser/>
                </ButtonIcon>
            </li>
            <li>
                <DarkmodeToggle/>
            </li>
            
            <li>
                <LogOut/>
            </li>
            
        </HeaderMenuStyle>
    )
}

export default HeaderMenuComponent

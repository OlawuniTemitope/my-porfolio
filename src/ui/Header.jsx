import styled from 'styled-components'
import HeaderMenuComponent from './HeaderMenuComponent'
import UserAvatar from '../features/authentication/UserAvatar'

const StyledHeader = styled.header` 
/* background-color:orangered; */
background-color:var(--color-grey-0);
padding: 1.2rem 4.8rem;
border-bottom:1px solid var(--color-gray-100) ;
display: flex;
gap:2.4rem;
align-items: center;
justify-content: flex-end;
`
function Header() {
    return (
        <StyledHeader>
            <UserAvatar/>
            <HeaderMenuComponent/>
        </StyledHeader>
    )
}

export default Header

import { useHistory } from 'react-router-dom'
import styled, {css} from 'styled-components'
import logo from '../../assets/taskr-logo.png'
import { Button, FlexSection } from "../../common"

const NavbarContainer = styled.div`
    width: 100%;
    height: 5em;
    background: transparent;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 5;
`

const PublicHeader = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`

const Logo = styled.img`
    height: 40%;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`

const PublicNavbar = () => {
    let history = useHistory()

    return <>
        <NavbarContainer hamburger>
            <PublicHeader>
                <FlexSection>
                    <Logo src={logo} onClick={() => history.push(`/`)}/>
                </FlexSection>
                <FlexSection>
                   <Button style={{marginRight: '1em'}} onClick={() => history.push(`/signup`)}>SIGN UP</Button>     
                   <Button important  onClick={() => history.push(`/login`)}>LOG IN</Button>                                    
                </FlexSection>
            </PublicHeader>
        </NavbarContainer>
    </>
}

export default PublicNavbar
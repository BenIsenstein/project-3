import { useHistory } from 'react-router-dom'
import styled, {css} from 'styled-components'
import logo from '../../assets/taskr-logo.png'
import { Button, FlexSection } from "../../common"

const NavbarContainer = styled.div`
    width: 100%;
    height: 3em;
    background: transparent;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 5;

    @media (min-width: ${props => props.theme.smScreen}) {
        height: 5em;
    }
`

const PublicHeader = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;

    @media (min-width: ${props => props.theme.smScreen}) {
        width: 80%;
    }
`

const Logo = styled.img`
    height: 60%;
    transition: all 1s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }

    @media (min-width: ${props => props.theme.smScreen}) {
        height: 40%;
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
                   <Button style={{marginRight: '.6em'}} onClick={() => history.push(`/signup`)}>SIGN UP</Button>     
                   <Button important  onClick={() => history.push(`/login`)}>LOG IN</Button>                                    
                </FlexSection>
            </PublicHeader>
        </NavbarContainer>
    </>
}

export default PublicNavbar
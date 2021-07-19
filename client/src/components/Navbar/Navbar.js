import React, { useState, useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styled, {css} from 'styled-components'
import { MenuIcon, CloseIcon, PersonIcon, CalendarIcon, ExitIcon } from "../../common"

import UserContext from '../../UserContext'

const NavbarContainer = styled.div`
    padding: 0 1em;
    height: 3em;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ${props => props.hamburger && css`
        background-color: ${props => props.theme.scdLt};
    `}
`

const NavMenu = styled.nav`
    background-color: ${props => props.theme.scdLt};
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100%;
    transition: 850ms;
    z-index: 1;

    ${props => props.active && css`
        right: 0;
        transition: 350ms;
    `}
`

const NavItem = styled(NavLink)`
    height: 2em;
    color: ${props => props.theme.prm};
    text-decoration: none;
    margin: 1em 2em 0 2em;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.prmDk};
    }

    &.${props => props.activeClassName} {
        color: ${props => props.theme.prmDk};
    }
`

const Navbar = () => {
    const userContext = useContext(UserContext)
    const ref = useRef()

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    useEffect(() => {
        const outsideClick = e => {
            if (sidebar && ref.current && !ref.current.contains(e.target)) {
                setSidebar(false)
            }
        }
        document.addEventListener('mousedown', outsideClick)
        return () => {
            document.removeEventListener('mousedown', outsideClick)
        }
    }, [sidebar])

    return <>
        <NavbarContainer hamburger>
            <MenuIcon onClick={showSidebar} />
        </NavbarContainer>
        <NavMenu active={sidebar} onClick={showSidebar} ref={ref}>
            <NavbarContainer>
                <CloseIcon />
            </NavbarContainer>
            <NavItem to='/calendar' activeClassName>
                <CalendarIcon nav style={{marginRight: '1em'}} />
                Calendar
            </NavItem>
            <NavItem to='/account' activeClassName>
                <PersonIcon style={{marginRight: '1em'}} />
                Account
            </NavItem>
            <NavItem to='/' exact activeClassName onClick={() => userContext.logOut()}>
                <ExitIcon style={{marginRight: '1em'}} />
                Log Out
            </NavItem>
        </NavMenu>
    </>
}

export default Navbar
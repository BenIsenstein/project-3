import React, { useState, useEffect, useContext, useRef } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled, {css} from 'styled-components'
import { HouseIcon, MenuIcon, CloseIcon, PersonIcon, CalendarIcon, LibraryIcon, SettingsIcon, ExitIcon, FlexSection } from "../../common"

import UserContext from '../../UserContext'

const NavbarContainer = styled.div`
    padding: 0 1em;
    height: 2.6em;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ${props => props.hamburger && css`
        justify-content: space-between;
        background-color: ${props => props.theme.scdLt};
    `}
`

const NavMenu = styled.nav`
    background-color: ${props => props.theme.scdLt};
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: -100%;
    transition: 850ms;
    z-index: 4;

    ${props => props.active && css`
        right: 0;
        transition: 350ms;
    `}
`

const NavItem = styled(NavLink)`
    height: 2em;
    color: ${props => props.theme.prm};
    text-decoration: none;
    margin: 1em 2.4em 0 2em;
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
    let history = useHistory()

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
            <HouseIcon nav onClick={() => history.push(`/calendar`)}/>
            <MenuIcon onClick={showSidebar} />
        </NavbarContainer>
        <NavMenu active={sidebar} onClick={showSidebar} ref={ref}>
            <FlexSection column>
                <NavbarContainer style={{alignSelf: 'flex-end'}}>
                    <CloseIcon />
                </NavbarContainer>
                <NavItem to='/calendar' activeClassName>
                    <CalendarIcon nav />
                    Calendar
                </NavItem>
                <NavItem to='/library' activeClassName>
                    <LibraryIcon nav />
                    Tasks Library
                </NavItem>
            </FlexSection>
            <FlexSection column style={{marginBottom: '2em'}}>
                <NavItem to='/account' activeClassName>
                    <PersonIcon nav />
                    Account
                </NavItem>
                <NavItem to='/settings' activeClassName>
                    <SettingsIcon nav />
                    Settings
                </NavItem>
                <NavItem to='/' exact activeClassName onClick={() => userContext.logOut()}>
                    <ExitIcon nav />
                    Log Out
                </NavItem>                
            </FlexSection>

        </NavMenu>
    </>
}

export default Navbar
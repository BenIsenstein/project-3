import styled from 'styled-components'

const FooterContainer = styled.div`
    padding: 2em 1em 1em 1em;
    height: 2.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.prm};
`

const Copyright = styled.span`
    font-size: .8em;
    color: white
`

const Footer = () => {
    return (
        <FooterContainer>
            <Copyright>© Copyright 2021 TASKr. All Rights Reserved.</Copyright>
        </FooterContainer>
    )
}
    
    

export default Footer
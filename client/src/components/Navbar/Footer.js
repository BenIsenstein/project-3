import styled from 'styled-components'

const FooterContainer = styled.div`
    padding: 0 1em;
    height: 2.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.scdLt};
`

const Footer = () => {
    return (
        <FooterContainer />
    )
}
    
    

export default Footer
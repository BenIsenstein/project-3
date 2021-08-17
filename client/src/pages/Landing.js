import styled from 'styled-components'
import { Page, FlexSection, Button } from "../common"
import coldhouse from '../assets/cold-house.jpg'
import calendar from '../assets/calendar.jpg'
import wave from '../assets/wave.svg'
import { useHistory } from 'react-router-dom'
import { useHandleUserStatus } from "../functions"

const LandingBlock = styled.div`
  width: 100vw;
  height: 80vh;
  margin-top: -5em;
  background: url(${coldhouse}) no-repeat center bottom;
  background-size: cover;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 100%,
    0 calc(100% - 6vw)
  );
`

const LandingTitle = styled.h1`
  width: 80%;
  text-align: right;
  font-size: 2em;
  font-weight: bolder;
  text-transform: uppercase;
  line-height: .8em;
  color: white;
  text-shadow: 1px 1px 3px #858585;
`

const IntroBlock = styled.div`
  width: 100vw;
  margin-top: -6vw;
  background-color: ${props => props.theme.acc};
  display: flex;
  justify-content: center;
`

const IntroText = styled.h3`
  width: 70%;
  margin: 4em 0 2em 0;
  color: ${props => props.theme.prm};
`

const ImgBlockContainer = styled.div`
  margin: 2em 0;
  width: 70vw;
  height: 14em;
  border-radius: 10px;
  background: url(${calendar}) no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  overflow: hidden;
  cursor: pointer;

  &:before {
    background: rgba(255, 243, 237, 0.8);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`

const LinkText = styled.h3`
  width: 60%;
  color: ${props => props.theme.titleColor};
  transition: all 1s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const Landing = () => {
    useHandleUserStatus()
    let history = useHistory()
  
    return <Page noBackground>
      <FlexSection column>

        <LandingBlock>
          <LandingTitle>Catch<br/>the problem<br/>before<br/>it catches you.</LandingTitle>         
        </LandingBlock>

        <IntroBlock>
          <IntroText>Can't remember the last time you checked the furnace?<br/><br/>With TASKr, you can rely on a COMPREHENSIVE and FULLY CUSTOMISABLE home maintenance schedule.</IntroText>
        </IntroBlock>

        <ImgBlockContainer onClick={() => history.push('/info')}>
          <LinkText>Industry-recommended Maintenance Schedule</LinkText>
        </ImgBlockContainer>
        
      </FlexSection>
   
    </Page>
}

export default Landing
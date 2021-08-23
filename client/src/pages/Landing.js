import styled, {css} from 'styled-components'
import { Page, FlexSection, Button } from "../common"
import coldhouse from '../assets/cold-house.jpg'
import calendar from '../assets/calendar.jpg'
import calendardrawing from '../assets/calendar.png'
import map from '../assets/map.png'
import alert from '../assets/alert.png'
import graph from '../assets/graph.png'
import houses from '../assets/houses.png'
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

  @media (min-width: ${props => props.theme.smScreen}) {
    font-size: 3em;
  }
`

const IntroBlock = styled.div`
  width: 100vw;
  margin-top: -12vw;
  background-color: ${props => props.theme.acc};
  display: flex;
  justify-content: center;

  @media (min-width: ${props => props.theme.smScreen}) {
    margin-top: -6vw;
  }
`

const IntroText = styled.h3`
  width: 90%;
  margin: 4em 0 2em 0;
  color: ${props => props.theme.prm};

  @media (min-width: ${props => props.theme.smScreen}) {
    width: 70%;
  }
`

const ImgBlockContainer = styled.div`
  margin: 2em 0;
  width: 90vw;
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

  @media (min-width: ${props => props.theme.smScreen}) {
    width: 70%;
  }

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
  text-decoration: underline;

  &:hover {
    transform: scale(1.1);
  }
`

const FeatureBlock = styled.div`
  margin-top: 1em;
  width: 100vw;
  display: flex;
  justify-content: center;
`

const FeatureContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.smScreen}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const FeatureCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.smScreen}) {
    width: 18%;
  }
`

const FeatureIcon = styled.div`
  height: 10em;
  outline: none;
  
  ${props => props.background && css`
    background: url(${props.background}) no-repeat center center;
    background-size: contain;
  `}
`

const FeatureText = styled.p`
  text-align: center;
  color: ${props => props.theme.titleColor};
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

        <FeatureBlock>
          <FeatureContainer>
            <FeatureCard>
              <FeatureIcon background={calendardrawing} />
              <FeatureText>Easily schedule and track your tasks</FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon background={alert} />
              <FeatureText>Receive reminders for upcoming and overdue tasks</FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon background={map} />
              <FeatureText>Search for nearby Service Providers</FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon background={houses} />
              <FeatureText>Manage multiple homes</FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon background={graph} />
              <FeatureText>Visualize your costs over time</FeatureText>
            </FeatureCard>            
          </FeatureContainer>
        </FeatureBlock>

        <ImgBlockContainer onClick={() => history.push('/info')}>
          <LinkText>Industry-recommended Maintenance Schedule</LinkText>
        </ImgBlockContainer>
        
      </FlexSection>
   
    </Page>
}

export default Landing
import styled from 'styled-components'
import { Page, FlexSection, Button } from "../common"
import coldhouse from '../assets/cold-house.jpg'
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
`

const LandingTitle = styled.h1`
  width: 80%;
  text-align: right;
  font-size: 2em;
  text-transform: uppercase;
  line-height: .8em;
  color: white;
  text-shadow: 1px 1px 3px #858585;
`

const Landing = () => {
    useHandleUserStatus()
    let history = useHistory()
  
    return <Page noBackground>
      <FlexSection column>
        <LandingBlock>
          <LandingTitle>Stay away from<br/>the bad kind<br/>of surprise.</LandingTitle>         
        </LandingBlock>

        <h3>TASKr provides the most comprehensive and customisable schedule for keeping your home in its best condition.</h3>
        <h4 style={{textAlign: 'center', margin: '1em 0'}}>Keep your home in excellent shape by following this schedule recommended by industry experts.</h4>
        <Button onClick={() => history.push('/info')} style={{marginBottom: '2em'}}>LIST OF MAINTENANCE</Button>
      </FlexSection>
   
    </Page>
}

export default Landing
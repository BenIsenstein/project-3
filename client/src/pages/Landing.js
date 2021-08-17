import styled from 'styled-components'
import { Page, PageContainer, GridSection, FlexSection, HouseIcon, Button } from "../common"
//import fireplace from '../assets/fireplace.jpg'
import leaking from '../assets/leaking.jpg'
import { useHistory } from 'react-router-dom'
import { useHandleUserStatus } from "../functions"

// const LandingBlock = styled.div`
//   width: 100vw;
//   height: 40em;
//   margin-top: -5em;
//   background-image: url(${fireplace});
//   background-size: cover;
//   background-position: center center;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

  const LandingBlock = styled.div`
  width: 100vw;
  height: 40em;
  margin-top: -5em;
  background-image: url(${leaking});
  background-size: cover;
  background-position: center center;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// const LandingTitle = styled.h1`
//   width: 80%;
//   margin: 3em 0;
//   text-align: center;
//   font-size: 3em;
//   color: white;
//`

const LandingTitle = styled.h1`
  width: 80%;
  margin: 3em 0;
  text-align: center;
  font-size: 3em;
  color: azure;
`

const Landing = () => {
    useHandleUserStatus()
    let history = useHistory()
  
    return <Page noBackground>
      <FlexSection column>
        <LandingBlock>
          <LandingTitle>Stay on top of your home maintenance schedule!</LandingTitle>          
        </LandingBlock>

        <h4 style={{textAlign: 'center', margin: '1em 0'}}>Keep your home in excellent shape by following this schedule recommended by industry experts.</h4>
        <Button onClick={() => history.push('/info')} style={{marginBottom: '2em'}}>LIST OF MAINTENANCE</Button>
      </FlexSection>
   
    </Page>
}

export default Landing
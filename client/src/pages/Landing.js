import styled from 'styled-components'
import { Page, PageContainer, GridSection, FlexSection, HouseIcon, Button } from "../common"
import { useHistory } from 'react-router-dom'
import { useHandleUserStatus } from "../functions"
import InfoTable from "../components/DataTable/InfoTable"

const LandingTitle = styled.h1`
  width: 80%;
  margin: 3em 0;
  text-align: center;
`

const Landing = () => {
    useHandleUserStatus()
    let history = useHistory()
  
    return <Page noBackground>
      <PageContainer>
          <GridSection gridTemplateColumns='1fr 4fr' gridGap='20px'>

            <FlexSection column alignCenter style={{marginTop: '6em'}}>            
              <HouseIcon onClick={() => history.push(`/`)} />
              {/* <Button constWidth onClick={() => history.push(`/info`)}>Industry Standards</Button> */}
              <Button important constWidth onClick={() => history.push(`/login`)}>LOG IN</Button>
              <Button constWidth onClick={() => history.push(`/signup`)}>CREATE AN ACCOUNT</Button>                 
            </FlexSection>

            <FlexSection column alignCenter>
              <LandingTitle>Stay on top of your home maintenance schedule!</LandingTitle>
              <h4 style={{textAlign: 'center', marginBottom: '1em'}}>Keep your home in excellent shape by following this schedule recommended by industry experts!</h4>
              <InfoTable />
            </FlexSection>
            
          </GridSection>
      </PageContainer>
    </Page>
}

export default Landing
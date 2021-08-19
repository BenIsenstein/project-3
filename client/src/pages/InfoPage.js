import styled from 'styled-components'
import InfoTable from "../components/DataTable/InfoTable"
import { Page, PageContainer} from "../common"
import leaking from '../assets/leaking.jpg'

const PhotoBlock = styled.div`
  width: 50vw;
  height: 40vh;
  margin-top: 10 em;
  background: url(${leaking}) no-repeat center center;
  background-size: cover;
  display: flex;
  marginLeft: 100 em;
  border-radius: 10px;
  position: relative;
 `


const InfoPage = () => {
    window.scrollTo(0,0)
    return  <Page fadeIn fullWidth marginTop1em>
          <PageContainer>      
            <InfoTable/>
            <PhotoBlock/>
          </PageContainer>
    </Page>
    
}

export default InfoPage


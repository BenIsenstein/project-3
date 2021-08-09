//import { useState, useContext, useEffect} from "react"
import InfoTable from "../components/DataTable/InfoTable"
import { Page, PageContainer, HouseIcon} from "../common"
//import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'

const InfoPage = () => {
  //let history = useHistory()


 

   // return isLoggedInChecked && <Page Background>
    return  <Page>
      <PageContainer>
          <InfoTable /> 
      </PageContainer>
    </Page>
    
}

export default InfoPage


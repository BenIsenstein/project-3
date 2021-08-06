import { useState, useContext, useEffect} from "react"
//import infoTable from "../../components/DataTable/InfoTable"
import { Page, PageContainer, HouseIcon} from "../common"
import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'

const InfoPage = () => {
  let history = useHistory()
 // const [isLoggedInChecked, setIsLoggedInChecked] = useState(false)
  
  // Capture the current state of the logged in user
  // let isLoggedIn = useContext(UserContext).isLoggedIn
  // // If user is logged in already and somehow ends up on the landing page,
  // // redirect them to their CALENDAR.
  // useEffect(() => {
  //   if (isLoggedIn) history.push(`/info`)
  //   setIsLoggedInChecked(true)

  // }, [isLoggedIn, history])
 

   // return isLoggedInChecked && <Page Background>
    return  <Page Background>
      <PageContainer Center mockMobileView>
          <HouseIcon />
          <p>Infotable will go here</p>
      </PageContainer>
    </Page>
    
}

export default InfoPage


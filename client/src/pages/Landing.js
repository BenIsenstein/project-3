import { Page, PageContainer, HouseIcon, Button } from "../common"
import { useHistory } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import UserContext from '../UserContext'
import { useHandleUserStatus } from "../functions"

const Landing = () => {
    useHandleUserStatus()
    let history = useHistory()
    

    return <Page noBackground>
      <PageContainer centerPage mockMobileView>
          <HouseIcon onClick={() => history.push(`/`)} />
          <Button constWidth onClick={() => history.push(`/info`)}>Industry Standards</Button>
          <Button important constWidth onClick={() => history.push(`/login`)}>LOG IN</Button>
          <Button constWidth onClick={() => history.push(`/signup`)}>CREATE AN ACCOUNT</Button>
      </PageContainer>
    </Page>
    
}

export default Landing
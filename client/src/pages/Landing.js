import { Page, PageContainer, HouseIcon, Button } from "../common"
import { useHistory } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import UserContext from '../UserContext'

const Landing = () => {
    let history = useHistory()
    const [isLoggedInChecked, setIsLoggedInChecked] = useState(false)
    
    // Capture the current state of the logged in user
    let isLoggedIn = useContext(UserContext).isLoggedIn

    // If user is logged in already and somehow ends up on the landing page,
    // redirect them to their CALENDAR.
    useEffect(() => {
        if (isLoggedIn) history.push(`/calendar`)
        setIsLoggedInChecked(true)

    }, [isLoggedIn, history])

    return !isLoggedInChecked ? null : (
        <Page>
            <PageContainer centerPage mockMobileView>
                <HouseIcon onClick={() => history.push(`/`)} />
                <Button important constWidth onClick={() => history.push(`/login`)}>LOG IN</Button>
                <Button constWidth onClick={() => history.push(`/signup`)}>CREATE AN ACCOUNT</Button>
            </PageContainer>
        </Page>
    )
}

export default Landing
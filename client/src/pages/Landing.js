import { Page, PageContainer, HouseIcon, Button } from "../common"
import { useHistory } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import UserContext from '../UserContext'

const Landing = () => {
    let history = useHistory()

    // Capture the current state of the logged in user
    let userContext = useContext(UserContext)

    // If user is logged in already and somehow ends up on the landing page,
    // redirect them to their CALENDAR.
    useEffect(() => {
        if (userContext.isLoggedIn) {
            history.push(`/calendar`)
        }
    // }, [userContext])
    })    

    return (
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
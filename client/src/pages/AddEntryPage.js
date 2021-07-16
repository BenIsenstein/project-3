import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Page, Button, PageContainer } from '../common'
import AddEntry from "../components/AddEntry"
import UserContext from '../UserContext'

const AddEntryPage = () => {  
    const history = useHistory()
    const userContext = useContext(UserContext)

    return (
        <Page>
            <PageContainer>
                {/* // If user is NOT logged in and accidentally navigated to this page,
                // redirect them to the LANDING PAGE. */}
                {userContext.user === undefined &&
                    <Button onClick={() => history.push(`/`)}>Click to Login</Button>
                }
                {userContext.user !== undefined &&
                    <AddEntry />
                }
            </PageContainer>
        </Page>
    )
}
export default AddEntryPage
import { useHistory } from 'react-router-dom'
import { Page, PageContainer, TextLink } from '../common'

import Login from "../components/User/Login"

const LoginPage = () => {
    let history = useHistory()

    return (
        <Page>
            <PageContainer centerPage mockMobileView>
                <Login />
                <p>Don't have an account? <TextLink onClick={() => history.push(`/signup`)}>Register</TextLink> here.</p>
            </PageContainer>
        </Page>
    )
}

export default LoginPage
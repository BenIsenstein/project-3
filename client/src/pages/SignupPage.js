import { useHistory } from 'react-router-dom'
import { Page, PageContainer, TextLink } from '../common'
import Signup from "../components/User/Signup"

const SignupPage = () => {
    let history = useHistory()

    return (
        <Page>
            <PageContainer centerPage mockMobileView>
                <Signup />
                <p>Already have an account? <TextLink onClick={() => history.push(`/login`)}>Log in</TextLink> here.</p>
            </PageContainer>
        </Page>
    )
}

export default SignupPage
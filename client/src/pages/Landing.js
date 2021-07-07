import { Page, PageContainer, HouseIcon, Button } from "../common"
import { useHistory } from 'react-router-dom'

const Landing = () => {
    let history = useHistory()

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
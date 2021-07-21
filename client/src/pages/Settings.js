import TestEmailButton from '../components/TestEmailButton'
import { Page, PageContainer } from '../common'

const Settings = () => {
    return (
        <Page>
            <PageContainer>
                <TestEmailButton /> Email me a reminder for my tasks now!
            </PageContainer>
        </Page>
    )
}

export default Settings
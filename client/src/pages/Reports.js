import { useHistory } from 'react-router-dom'
import { Page, PageContainer, Button } from '../common'

const Reports = () => {
    const history = useHistory()

    return (
        <Page>
            <PageContainer>
                <Button onClick={() => history.push('/reports/cost-analysis')}>COST ANALYSIS!!!!</Button>
            </PageContainer>
        </Page>
    )
}

export default Reports
import { useHistory } from 'react-router-dom'
import { Page, PageContainer, Button } from '../common'

const Reports = () => {
    const history = useHistory()

    return (
        <Page>
            <PageContainer>
                <h1>DATA ANALYTICS</h1>
                <br></br>
                <br></br>
                Available Reports: <br></br>
                <br></br>
                <Button onClick={() => history.push('/reports/cost-analysis')}>COSTS-TO-DATE</Button>
                <br></br>
                <br></br>
                Under Construction:
                <ul>
                    <li>Average Monthly Costs</li>
                    <li>Expenditure Forecast</li>
                    <li>Cost Comparison by Home</li>
                </ul>
            </PageContainer>
        </Page>
    )
}

export default Reports
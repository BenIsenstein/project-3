import { useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, Button } from "../common"

const Welcome = () => {

  const history = useHistory()

    return  <Page>
      <PageContainer>

        <FlexSection fullWidth justifyCenter>
          <h1>WELCOME TO TASKr</h1>
        </FlexSection>

        <FlexSection fullWidth justifyCenter>
          <br></br>
          <p>You have reached this page because you are either a brand new member of TASKr, or you have just changed the email address related to your account.
          </p>
          <br></br>
          <p>We have sent a message to the email address you provided
            and eagerly await your confirmation of that email. Please check your inbox and follow the
            instructions provided in the message.
          </p>
          <br></br>
          <p>If you did not receive the email, or are having trouble accessing your account, please
            contact our Support Team at 1.tython@gmail.com.
          </p>
          <br></br>
        </FlexSection>
        <Button onClick={() => history.push(`/login`)}>LOG IN</Button> 
      </PageContainer>
    </Page>
    
}

export default Welcome


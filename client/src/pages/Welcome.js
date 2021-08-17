import { Page, PageContainer, FlexSection, FormSectionTitle } from "../common"

const Welcome = () => {
    return  <Page noBackground>
      <PageContainer>

        <FlexSection>
          <FormSectionTitle>Email Confirmation</FormSectionTitle>
        </FlexSection>

        <FlexSection column>
          <br/>
          <p>Before TASKr registers your new email address, please check your inbox on the email submitted and click confirm.</p>
          <br/>
          <p>If you did not receive the email, or are having trouble accessing your account, please contact our Support Team at 1.tython@gmail.com.</p>    
        </FlexSection>

      </PageContainer>
    </Page>
    
}

export default Welcome


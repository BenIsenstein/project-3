import { useHistory } from 'react-router-dom'
import { Page, PageContainer } from '../common'
import FormTemplate from '../components/FormTemplate/FormTemplate'

const AccountDetails = () => {
    const history = useHistory()
    const getAccountRoute = '/api/user/getloggedinuser'
    const inputs = [
        {
            name: "dateSignedUp",
            readOnly: true,
            labelText: "Member since:"  
        },
        {
            name: "firstName",
            registerOptions: { required: "You must input a first name." },
            labelText: "First Name:",
        },
        {
            name: "lastName",
            registerOptions: { required: "You must input a last name." },
            labelText: "Last Name:",
        },
        {
            name: "userType",
            registerOptions: { required: "You must input an account type." },
            labelText: "You are a:",
        },
        {
            name: "email",
            registerOptions: { required: "You must input an email address." },
            labelText: "",
        }
    ]

    // updateAccount submit function
    const updateAccount = async (data) => {
      try {
        let action = `/api/calendarEntry/update`
        let options = {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data)
        }
        let res = await fetch(action, options)
        let resObject = await res.json()
        
        if (!resObject.success) return alert("Your entry wasn't updated for some reason. Please try again.")
        history.goBack()
      }
      catch(err) {
        console.log('error updating calendar entry: ', err)
        alert("There was an error updating your entry. We're fixing it as fast as we can.")
      }
    } 

  return (
    <Page>
      <PageContainer flexColumn>
        <FormTemplate 
          titleText="Your Account"
          inputs={inputs} 
          formMode='details' 
          detailsUrl={getAccountRoute} 
          onSubmit={async data => alert('update account function not ready! ...yet ;)', data)} 
          addModeCancel={history.goBack}
        />
      </PageContainer>
    </Page>
  )
}

export default AccountDetails
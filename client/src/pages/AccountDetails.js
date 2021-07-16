import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Page, PageContainer, Button } from '../common'
import FormTemplate from '../components/FormTemplate/FormTemplate'
import UserContext from '../UserContext'

const AccountDetails = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [undergoingPasswordChange, setUndergoingPasswordChange] = useState(false)

  const accountInputs = [
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
    }
  ]

  const passwordInputs = [
    {
      name: "oldPassword",
      registerOptions: { required: "You must input your old passsword." },
      labelText: "Old password:",
      type: 'password'
    },
    {
      name: "newPassword",
      registerOptions: { required: "You must input your new passsword." },
      labelText: "New password:"
    }
  ]

  // updateAccount submit function
  const updateAccount = async (data) => {
    try {
      let isEmailChanged = data.email !== userContext.user.email  
      let userId = userContext.user._id
      let method = 'put'
      let headers = { "content-type": "application/json" }
      let body

      // if the user wants to change their email, start by updating their auth record
      // the only values in the request body are the new email and new dateLastModified
      if (isEmailChanged) {
        body = JSON.stringify({ email: data.email, dateLastModified: new Date() })

        // send auth update request
        let authRes = await fetch(`/api/auth/update/${userId}`, { method, headers, body })
        let authObject = await authRes.json()

        // return if the auth update was unsuccessful
        if (!authObject.success) return alert("Your entry wasn't updated for some reason. Please try again.")
      }
      // redefine body with all of the form data
      body = JSON.stringify(data)

      // send user update request
      let userRes = await fetch(`/api/user/update/${userId}`, { method, headers, body }) 
      let userObject = await userRes.json()

      // if the update was unsuccessful, reverse the email change made to the auth document
      if (!userObject.success && isEmailChanged) { 
        body = JSON.stringify({ email: userContext.user.email })
        let authCorrection = await fetch(`/api/auth/update/${userId}`, { method, headers, body })
        let correctionObject = await authCorrection.json()

        // return if the auth correction was unsuccessful
        if (!correctionObject.success) return alert("Your entry update failed halfway through. Please contact customer service.")
      }

      // make sure the data for context update includes _id and dateSignedUp
      // set all context to match the account changes and redirect 
      for (let key of ['dateSignedUp', '_id']) data[key] = userContext.user[key]
      userContext.setUserInfo(data)
      history.push("/calendar")
    }
    catch(err) {
      console.log('error updating account: ', err)
      alert("There was an error updating your account. We're fixing it as fast as we can.")
    }
  } 

  const ChangePassword = (data) => {
    alert("No change password function yet! :)")
  }

  const ChangePasswordButton = () => <>{
    !undergoingPasswordChange && 
    <Button 
      important 
      formSubmit 
      type='button' 
      onClick={() => setUndergoingPasswordChange(true)}
    >
      Change Password
    </Button>
  }</>

  return (
    <Page>
      <PageContainer flexColumn>
        <FormTemplate 
          titleText="Your Account"
          inputs={accountInputs} 
          formMode='details' 
          detailsUrl='/api/user/getloggedinuser' 
          onSubmit={updateAccount} 
          AfterTemplate={ChangePasswordButton}
        />
        <FormTemplate 
          noBackButton
          noDeleteButton
          popup
          popupCondition={undergoingPasswordChange}
          titleText='Change Password'
          inputs={passwordInputs}
          formMode='add'
          onSubmit={ChangePassword}
          addModeCancel={() => setUndergoingPasswordChange(false)}
        />
      </PageContainer>
    </Page>
  )
}

export default AccountDetails
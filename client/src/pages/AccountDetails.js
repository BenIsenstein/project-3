import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Page, PageContainer, Button, Input, FlexSection, EyeIcon, EyeSlashIcon } from '../common'
import { validatePassWithMessage } from '../functions'
import FormTemplate from '../components/FormTemplate/FormTemplate'
import ToggleVisibleInput from '../components/ToggleVisibleInput/ToggleVisibleInput'
import UserContext from '../UserContext'

const AccountDetails = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [undergoingPasswordChange, setUndergoingPasswordChange] = useState(false)

  const ChangePasswordButton = () => <>{
    !undergoingPasswordChange && 
    <FlexSection fullWidth justifyStart marginTop1em>
      <Button  
        type='button' 
        onClick={() => setUndergoingPasswordChange(true)}
      >
        Change Password
      </Button>      
    </FlexSection>

  }</>

  const accountInputs = [
    // {
    //   name: "dateSignedUp",
    //   readOnly: true,
    //   labelText: "Member since"  
    // },
    {
      name: "firstName",
      registerOptions: { required: "You must input a first name." },
      labelText: "First Name"
    },
    {
      name: "lastName",
      registerOptions: { required: "You must input a last name." },
      labelText: "Last Name",
    },
    // {
    //   name: "userType",
    //   registerOptions: { required: "You must input an account type." },
    //   labelText: "You are a",
    // },
    {
      name: "email",
      registerOptions: { required: "You must input an email address." },
    }
  ]

  const passwordInputs = [
    {
      name: "password",
      registerOptions: { required: "You must input your old password." },
      labelText: "Old password",
      type: 'password'
    },
    {
      name: "newPassword",
      labelText: "New password",
      as: ToggleVisibleInput,
      margin: "0 5px 0 0",
      registerOptions: { 
        required: "You must input your new password.", 
        validate: (value) => validatePassWithMessage(value)
      }
    }
  ]

  // updateAccount submit function
  const updateAccount = async (data) => {
    try {
      let isEmailChanged = data.email !== userContext.user.email  
      let authAction = `/api/auth/update/${userContext.user._id}`
      let userAction = `/api/user/update/${userContext.user._id}`
      let method = 'put'
      let headers = { "content-type": "application/json" }
      let body

      // if the user wants to change their email, start by updating their auth record
      // the only values in the request body are the new email and new dateLastModified
      if (isEmailChanged) {
        body = JSON.stringify({ email: data.email, dateLastModified: new Date() })

        // send auth update request
        let authRes = await fetch(authAction, { method, headers, body })
        let authObject = await authRes.json()

        // return if the auth update was unsuccessful
        if (!authObject.success) return alert("Your entry wasn't updated for some reason. Please try again.")
      }
      // redefine body with all of the form data
      body = JSON.stringify(data)

      // send user update request
      let userRes = await fetch(userAction, { method, headers, body }) 
      let userObject = await userRes.json()

      // if the update was unsuccessful, reverse the email change made to the auth document
      if (!userObject.success && isEmailChanged) { 
        body = JSON.stringify({ email: userContext.user.email })
        let authCorrection = await fetch(authAction, { method, headers, body })
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

  const ChangePassword = async (data) => {
    try {
      const options = {
        method: 'put',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, username: userContext.user?.email })
      }
    
      let passwordRes = await fetch('/api/auth/change-password', options)
      
      if (passwordRes.status === 401) return alert("Verification failed. Please make sure your password is correct.")
      
      let passwordObject = await passwordRes.json()
      
      if (!passwordObject.success) return alert("Your password failed to update for some reason. We're working on it.")

      alert("Your password was successfully changed.")
      history.push('/calendar')
    }
    catch(err) {
      console.log('error updating password: ', err)
      alert("Something went wrong.")
    }
  }

  return (
    <Page>
      <PageContainer flexColumn>
        <FormTemplate 
          noBackButton
          noDeleteButton
          titleText="Personal Details"
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
          onSubmit={ChangePassword}
          addModeCancel={() => setUndergoingPasswordChange(false)}
        />
      </PageContainer>
    </Page>
  )
}

export default AccountDetails
import { useState } from 'react'
import { Page, PageContainer, Button, FlexSection } from '../common'
import { validatePassWithMessage, useUpdateAccount, useChangePassword } from '../functions'
import FormTemplate from '../components/FormTemplate/FormTemplate'

const AccountDetails = () => {
  const updateAccount = useUpdateAccount()
  const changePassword = useChangePassword()
  const [undergoingPasswordChange, setUndergoingPasswordChange] = useState(false)

  const ChangePasswordButton = () => !undergoingPasswordChange && <>
    <FlexSection fullWidth justifyStart marginTop1em>
      <Button  
        type='button' 
        onClick={() => setUndergoingPasswordChange(true)}
      >
        Change Password
      </Button>      
    </FlexSection>
  </>

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
      toggleVisible: true,
      margin: "0 5px 0 0",
      registerOptions: { 
        required: "You must input your new password.", 
        validate: (value) => validatePassWithMessage(value)
      }
    }
  ]

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
          onSubmit={changePassword}
          addModeCancel={() => setUndergoingPasswordChange(false)}
        />
      </PageContainer>
    </Page>
  )
}

export default AccountDetails
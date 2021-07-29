import { useState } from 'react'
import { Page, PageContainer, Button, FlexSection } from '../common'
import { validatePassWithMessage, useUpdateAccount, useChangePassword } from '../functions'
import SuperForm from '../components/SuperForm/SuperForm'
import ToggleVisibleInput from '../components/SuperForm/ToggleVisibleInput/ToggleVisibleInput'
import GroupOfInputs, { SuperFormSelect } from '../components/SuperForm/GroupOfInputs/GroupOfInputs'

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
    {
      name: "dateSignedUp",
      readOnly: true,
      labelText: "Member since"  
    },
    {
      forwardRegister: true,
      forwardErrors: true,
      as: GroupOfInputs,
      inputs: [
        {
          name: "firstName",
          registerOptions: { required: "You must input a first name." },
          labelText: "First Name",
          wrapperProps: {gridColumn: '1/2'}
        },
        {
          name: "lastName",
          registerOptions: { required: "You must input a last name." },
          labelText: "Last Name",
          wrapperProps: {gridColumn: '3/4'}
        }
      ]
    },
    {
      name: "userType",
      registerOptions: { required: "You must input an account type." },
      labelText: "You are a",
      forwardRegister: true, 
      as: SuperFormSelect,
      options: [
        {value: "homeManager"},
        {value: "serviceProvider"},
        {value: "insuranceProvider"},
      ]
    },
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
      forwardRegister: true,
      as: ToggleVisibleInput,
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
        <SuperForm 
          titleText="Personal Details"
          inputs={accountInputs} 
          formMode='details' 
          detailsUrl='/api/user/getloggedinuser' 
          onSubmit={updateAccount} 
          AfterTemplate={<ChangePasswordButton />}
        />
        <SuperForm 
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
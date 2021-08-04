import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext'
import { Page, PageContainer, Button, SwitchViewButton, FlexSection, FormSectionTitle, FormSeparator, PencilIcon, HomeAddIcon } from '../common'
import { validatePassWithMessage, useUpdateAccount, useChangePassword, useHandleUserStatus } from '../functions'
import SuperForm from '../components/SuperForm/SuperForm'
import ToggleVisibleInput from '../components/SuperForm/ToggleVisibleInput'
import GroupOfInputs, { SuperFormSelect } from '../components/SuperForm/GroupOfInputs'

const AccountDetails = () => {
  useHandleUserStatus()
  const history = useHistory()
  const userContext = useContext(UserContext)
  const updateAccount = useUpdateAccount()
  const changePassword = useChangePassword()
  const [undergoingPasswordChange, setUndergoingPasswordChange] = useState(false)
  const [homes, setHomes] = useState([])

  

  const ChangePasswordButton = () => !undergoingPasswordChange && <>
    <FlexSection fullWidth justifyStart marginTop1em>
      <Button
        text  
        type='button' 
        onClick={() => setUndergoingPasswordChange(true)}
      >
        Change Password
      </Button>      
    </FlexSection>
  </>

  const accountInputs = [
    {
      isCustomComponent: true,
      forwardErrors: true,
      as: GroupOfInputs,
      inputs: [
        {
          name: "dateSignedUp",
          readOnly: true,
          labelText: "Member since"           
        },
        {
          name: "userType",
          registerOptions: { required: "You must select an account type." },
          labelText: "You are a",
          isCustomComponent: true, 
          as: SuperFormSelect,
          options: [
            {value: "Home Manager"},
            {value: "Service Provider"},
            {value: "Insurance Provider"},
          ]
        }
      ]
    },
    {
      isCustomComponent: true,
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
      isCustomComponent: true,
      as: ToggleVisibleInput,
      margin: "0 5px 0 0", 
      registerOptions: { 
        required: "You must input your new password.", 
        validate: (value) => validatePassWithMessage(value)
      }
    }
  ]

  // Effect to fetch all entries
  useEffect(() => {
    if (!userContext.user) return

    const fetchHomes = async () => {
      try {
        let homesRes = await fetch(`/api/home/getbyuser/${userContext.user._id}`)
        let homesObject = await homesRes.json()
        // let list = homesObject.entryList
        // let homesArray = []
      
        setHomes(homesObject)
      }  
      catch (err) {
        console.log(err)
        alert(`
          There was an error loading your homes. 
          We're fixing it as fast as we can.
        `)
      }
    }
    fetchHomes()
  }, [userContext.user])

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

        <FormSeparator />

        <FlexSection alignCenter>
          <FormSectionTitle>Manage Home(s)</FormSectionTitle>
          <Button inline onClick={() => history.push('/new-home')}><HomeAddIcon /></Button>
        </FlexSection>
        {homes.map((home, index) => {
          return (
            <FlexSection key={index}>
              <p>{home.address}</p>
              <SwitchViewButton edit><PencilIcon /></SwitchViewButton>
            </FlexSection>
          )
        })}
      </PageContainer>
    </Page>
  )
}

export default AccountDetails
import TestEmailButton from "../components/TestEmailButton"
import { useEffect, useState, useContext, useMemo } from "react"
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext'
import FilterContext from '../FilterContext'
import { Page, PageContainer, Button, FlexSection, FormSectionTitle, FormSeparator, CalendarIcon } from "../common"
import SuperForm from "../components/SuperForm/SuperForm"
// import GroupOfInputs, { GroupOfCheckboxes, SuperFormSelect } from "../components/SuperForm/GroupOfInputs"
import { useHandleUserStatus, useUpdateICS } from "../functions"
import CalendarFilter from '../components/Filter/CalendarFilter'
import ClipboardJS from 'clipboard'

const Settings = () => {
  useHandleUserStatus()
  const userContext = useContext(UserContext)
  const filterContext = useContext(FilterContext)
  const history = useHistory()
  const updateICS = useUpdateICS()
  //const { SuperForm } = useSuperForm()
  const [undergoingPreferenceChange, setUndergoingPreferenceChange] = useState(false)
  const [undergoingNotificationChange, setUndergoingNotificationChange] = useState(false)
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState({
    active: true,
    completed: false,
    homes: []
  })
  
  const CalendarFilterWithProps = () => <CalendarFilter checkedAll={checkedAll} setCheckedAll={setCheckedAll} checked={checked} setChecked={setChecked}/>

  const updateFilterPrefs = async (data) => {
    try {
      data.settings = {}
      data.settings.filterPrefs = checked
      console.log("updateFilterPrefs says, data = ", data)

      // Save the new preferences in User Account SETTINGS
      // await updateAccount(data, mode)     
      let userAction = `/api/user/update/settings/filter/${userContext.user._id}`
      let method = 'put'
      let headers = { "content-type": "application/json" }
      let body

      // redefine body with all of the form data
      body = JSON.stringify(data)

      // send user update request
      let userRes = await fetch(userAction, { method, headers, body }) 
      let userObject = await userRes.json()

      if (!userObject.success){
        console.log("Error trying to update the user account!!!")
      }
      else {
        // Update User Context
        // Make sure the data for context update includes _id and dateSignedUp
        // set all context to match the account changes and redirect

        // //let tempUserContextObject = Object.assign({}, userContext.user)
        // //let tempUserContextObject = {...userContext.user, [settings.filterPrefs]: checked}
        // let tempUserContextObject = {...userContext.user}
        // console.log("tempObject = ", tempUserContextObject)
        // tempUserContextObject.settings.filterPrefs = checked
        // userContext.setUserInfo(tempUserContextObject)

        // Update the session FILTER state with the new filter preference
        filterContext.setFilterInfo(checked)
      }
      // Stay on the current page, but close the Filter Preference area.
      setUndergoingPreferenceChange(false)
    }
    catch(err) {
      console.log('Error updating account: ', err)
      alert("There was an error updating your account Filter Preferences. We're fixing it as fast as we can.")
    }
  }

  // -----------  PRELOAD USER FILTER PREFERENCES -----------
  // Every time user chooses to work with FILTER preferences, retrieve whatever
  // SETTINGS preferences are currently stored in the database for that user.
  // Then set local STATE variables so that the saved preference values are pre-loaded
  // into the appropriate selectors.
  useEffect(() => {

    const loadUserSettings = async () => {

      let userRes = await fetch("/api/user/getloggedinuser")
      let userObject = await userRes.json()

      if ('settings' in userObject) {
        if ('filterPrefs' in userObject.settings){
          let userFilterPrefs = userObject.settings.filterPrefs 
          setChecked(userFilterPrefs)
        }
        else {
          console.log("No FILTER PREFERENCE for user found!!!")
        }
      }
      else {
        console.log("No SETTINGS for user found!!!")
      }
    }

    loadUserSettings()

  },[undergoingPreferenceChange])


  const CopyLink = () => {
    const clipboard = new ClipboardJS('.About-button')
    clipboard.on('success', (event) => {
      alert(`'${event.text}' has been copied to your clipboard.`)
      event.clearSelection()
    })

    return (
      <div>
        {/* localhost:3000/api/calFile/icsLink/{userContext.user.calFileId}.ics */}
        <Button
          className="About-button"
          data-clipboard-text={`https://taskr-1.herokuapp.com/api/calFile/icsLink/${userContext.user.calFileId}.ics`}
        >
          Copy ICS Link      
        </Button>
      </div>
    )
  }

  return (
    <Page>
      <PageContainer flexColumn>
          <FlexSection fullWidth column>

            <FormSectionTitle style={{marginBottom: '1em', textTransform: 'uppercase'}}>Preferences</FormSectionTitle> 

            {!undergoingPreferenceChange &&  
              <Button
                type="button"
                onClick={() => setUndergoingPreferenceChange(true)}
              >
                Filters
              </Button>
             }

            <SuperForm
              popup
              popupCondition={undergoingPreferenceChange}
              BeforeSubmitButton={<CalendarFilterWithProps />}
              titleText="Filters"
              onSubmit={updateFilterPrefs}
              addModeCancel={() => setUndergoingPreferenceChange(false)}
            />
           
          </FlexSection>

          <FormSeparator />
          
          {/* <FlexSection fullWidth column>
            {!undergoingNotificationChange &&  
              <Button
                type="button"
                onClick={() => setUndergoingNotificationChange(true)}
              >
                Notifications
              </Button>
            }

            <SuperForm
              popup
              popupCondition={undergoingNotificationChange}
              // BeforeSubmitButton={<CalendarFilter checkedAll={checkedAll} setCheckedAll={setCheckedAll} checked={checked} setChecked={setChecked}/>}
              // BeforeTemplate={<CalendarFilter />}
              // AfterTemplate={<CalendarFilter />}
              // BeforeSubmitButton={<CalendarFilter />}
              // modalContent={<CalendarFilter />}
              // detailsUrl="/api/user/update/${userContext.user._id}" 

              titleText="Notifications"
              //inputs={filterInputs}

              onSubmit={data => console.log(data)}
              addModeCancel={() => setUndergoingNotificationChange(false)}
            />

          </FlexSection>

          <FormSeparator /> */}

          <FlexSection fullWidth justifyCenter>
            <TestEmailButton /> Email me a reminder for my tasks now!
          </FlexSection>
          <FormSeparator />
          <FlexSection column fullWidth justifyCenter>
            <p>Find the link to your ICS file here:</p>
            {userContext.user.calFileId && <CopyLink />}
          </FlexSection>

      </PageContainer>
    </Page>
  )
}

export default Settings

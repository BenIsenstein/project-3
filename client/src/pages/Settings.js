import TestEmailButton from "../components/TestEmailButton"
import { useEffect, useState, useContext, useMemo } from "react"
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext'
import FilterContext from '../FilterContext'
import { Page, PageContainer, Button, FlexSection, FormSectionTitle, FormSeparator } from "../common"
import SuperForm from "../components/SuperForm/SuperForm"
import GroupOfInputs, { GroupOfCheckboxes, SuperFormSelect } from "../components/SuperForm/GroupOfInputs"
import { useHandleUserStatus, useUpdateAccount } from "../functions"
import CalendarFilter from '../components/Filter/CalendarFilter'

const Settings = () => {
  useHandleUserStatus()
  const userContext = useContext(UserContext)
  const filterContext = useContext(FilterContext)
  const updateAccount = useUpdateAccount()
  const history = useHistory()

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
    data.settings = {}
    data.settings.filterPrefs = checked
    let mode = "filterPrefs"
    // Save the new preferences in User Account SETTINGS
    await updateAccount(data, mode)
    // Update the session FILTER state with the new filter preference
    filterContext.setFilterInfo(checked)
    // Redirect user back to the SETTINGS page.
    history.push(`/settings`)
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
        
      </PageContainer>
    </Page>
  )
}

export default Settings

import TestEmailButton from "../components/TestEmailButton";
import { useState, useContext, useMemo } from "react";
import UserContext from '../UserContext';
import { Page, PageContainer, Button, FlexSection, FormSectionTitle, FormSeparator } from "../common";
//import { validatePassWithMessage, useUpdateAccount, useChangePassword } from '../functions'
import SuperForm from "../components/SuperForm/SuperForm";
import GroupOfInputs, { GroupOfCheckboxes, SuperFormSelect } from "../components/SuperForm/GroupOfInputs/GroupOfInputs";
import { useUpdateAccount } from "../functions";
import CalendarFilter from '../components/Filter/CalendarFilter'

const Settings = () => {
  const userContext = useContext(UserContext)
  const updateAccount = useUpdateAccount()
  const updateFilterPrefs = async (data) => {
    data.settings = {}
    data.settings.filterPrefs = checked
    await updateAccount(data)
  }

  const [undergoingPreferenceChange, setUndergoingPreferenceChange] = useState(false)
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState({
    active: true,
    completed: false
  })

  const CalendarFilterWithProps = () => <CalendarFilter checkedAll={checkedAll} setCheckedAll={setCheckedAll} checked={checked} setChecked={setChecked}/>
  const [undergoingNotificationChange, setUndergoingNotificationChange] = useState(false)


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
          
          <FlexSection fullWidth column>
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

          <FormSeparator />

          <FlexSection fullWidth justifyCenter>
            <TestEmailButton /> Email me a reminder for my tasks now!
          </FlexSection>
        
      </PageContainer>
    </Page>
  );
};

export default Settings;

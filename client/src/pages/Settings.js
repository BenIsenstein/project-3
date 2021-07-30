import TestEmailButton from "../components/TestEmailButton";
import { useState, useContext } from "react";
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
  const [undergoingPreferenceChange, setUndergoingPreferenceChange] = useState(false)
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState({
        active: true,
        completed: false
      })
  const [undergoingNotificationChange, setUndergoingNotificationChange] = useState(false)

  const ChangePreferenceButton = () =>
    !undergoingPreferenceChange && (
      <>
        <FlexSection fullWidth justifyStart marginTop1em>
          <Button
            type="button"
            onClick={() => setUndergoingPreferenceChange(true)}
          >
            Set Filter Preference
          </Button>
        </FlexSection>
      </>
    );

  const filterInputs = [
    // {
    //   isCustomComponent: true,
    //   forwardErrors: true,
    //   as: GroupOfCheckboxes,
    //   inputs: [
    //     {
    //       name: "settings.filterprefs.active",
    //       registerOptions: {},
    //       labelText: "Active",
    //       wrapperProps: { gridColumn: "1/2" },
    //     },
    //     {
    //       name: "settings.filterprefs.completed",
    //       registerOptions: {},
    //       labelText: "Completed",
    //       wrapperProps: { gridColumn: "3/4" },
    //     },
    //   ],
    // },
    {
      isCustomComponent: true,
    }
  ];

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
              BeforeSubmitButton={<CalendarFilter checkedAll={checkedAll} setCheckedAll={setCheckedAll} checked={checked} setChecked={setChecked}/>}
              // BeforeTemplate={<CalendarFilter />}
              // AfterTemplate={<CalendarFilter />}
              // BeforeSubmitButton={<CalendarFilter />}
              // modalContent={<CalendarFilter />}
              // detailsUrl="/api/user/update/${userContext.user._id}" 

              titleText="Filters"
              // inputs={filterInputs}

              onSubmit={updateAccount}
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
              inputs={filterInputs}

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

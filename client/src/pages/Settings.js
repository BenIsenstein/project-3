import TestEmailButton from "../components/TestEmailButton";
import { useState, useContext } from "react";
import UserContext from '../UserContext';
import { Page, PageContainer, Button, FlexSection } from "../common";
//import { validatePassWithMessage, useUpdateAccount, useChangePassword } from '../functions'
import SuperForm from "../components/SuperForm/SuperForm";
import GroupOfInputs, { GroupOfCheckboxes, SuperFormSelect } from "../components/SuperForm/GroupOfInputs/GroupOfInputs";
import { useUpdateAccount } from "../functions";
import CalendarFilter from '../components/Filter/CalendarFilter'

const Settings = () => {
  const userContext = useContext(UserContext)
  const updateAccount = useUpdateAccount()
  const [undergoingPreferenceChange, setUndergoingPreferenceChange] = useState(false)

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
    {
      forwardRegister: true,
      forwardErrors: true,
      as: GroupOfCheckboxes,
      inputs: [
        {
          name: "settings.filterprefs.active",
          registerOptions: {},
          labelText: "Active",
          wrapperProps: { gridColumn: "1/2" },
        },
        {
          name: "settings.filterprefs.completed",
          registerOptions: {},
          labelText: "Completed",
          wrapperProps: { gridColumn: "3/4" },
        },
      ],
    },
  ];

  return (
    <Page>
      <PageContainer flexColumn>
          <FlexSection fullWidth justifyStart marginTop1em>
          {!undergoingPreferenceChange &&  
            <Button
              type="button"
              onClick={() => setUndergoingPreferenceChange(true)}
            >
              Set Filter Preference
            </Button>
          }
          </FlexSection>
      
        <SuperForm
          popup
          popupCondition={undergoingPreferenceChange}
          // detailsUrl="/api/user/update/${userContext.user._id}" 
          titleText="Filter Preferences"
          inputs={filterInputs}
          // modalContent={<CalendarFilter />}

          onSubmit={updateAccount}
          addModeCancel={() => setUndergoingPreferenceChange(false)}
        />
        <hr />
  
        <TestEmailButton /> Email me a reminder for my tasks now!
      </PageContainer>
    </Page>
  );
};

export default Settings;

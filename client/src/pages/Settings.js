import TestEmailButton from "../components/TestEmailButton";
import { useState } from "react";
import { Page, PageContainer, Button, FlexSection } from "../common";
//import { validatePassWithMessage, useUpdateAccount, useChangePassword } from '../functions'
import SuperForm from "../components/SuperForm/SuperForm";
import GroupOfInputs, { GroupOfCheckboxes, SuperFormSelect } from "../components/SuperForm/GroupOfInputs/GroupOfInputs";
import { useUpdateAccount } from "../functions";

const Settings = () => {
  const [undergoingPreferenceChange, setUndergoingPreferenceChange] =
    useState(false);
  const updateAccount = useUpdateAccount();

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
          name: "active",
          registerOptions: {},
          labelText: "Active",
          wrapperProps: { gridColumn: "1/2" },
        },
        {
          name: "completed",
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
          detailsUrl="/api/user/getloggedinuser"
          titleText="Filter Preferences"
          inputs={filterInputs}
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

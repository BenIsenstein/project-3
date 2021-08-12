import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, FormSeparator, Button } from '../common'
import FormTemplate from '../components/SuperForm/SuperForm'
import DeleteEntryButton from '../components/DeleteEntryButton'
import { useHandleUserStatus, useUpdateEntry } from '../functions'
import DisplayHomeFromId from '../components/SuperForm/DisplayHomeFromId'
import { HomeItemsSelect } from '../components/SuperForm/DynamicSelects'

const EntryDetails = () => {
  useHandleUserStatus()
  const { id } = useParams()
  const history = useHistory()
  const updateEntry = useUpdateEntry()
  const [isCompleted, setIsCompleted] = useState(false)
  const [undergoingCompletion, setUndergoingCompletion] = useState(false)
  const [isCompletedHandled, setIsCompletedHandled] = useState(false)
  const shouldShowCompletion = (isCompleted || undergoingCompletion)
  const getEntryRoute = `/api/calendarEntry/get/${id}`

  useEffect(() => {
    const handleIsCompleted = async () => {
      try {
        let entryRes = await fetch(getEntryRoute)
        let entry = await entryRes.json()

        if (entry.completed) setIsCompleted(true)
      }
      catch(err) {
        console.log(err)
      }
    }

    handleIsCompleted()
    setIsCompletedHandled(true)

  }, [getEntryRoute])

  const entryDetailsInputs = [ 
    {
      name: "homeId",
      labelText: "home",
      isCustomComponent: true,
      as: DisplayHomeFromId
    },
    {
      name: "item",
      isCustomComponent: true,
      as: HomeItemsSelect,
      registerOptions: { required: "You must choose an item." }
    },
    {
      name: "task",
      registerOptions: { required: "You must write a task." },
      maxLength: '50'
    },
    {
      name: "notes",
    },    
    {
      name: 'serviceProviderInfo',
      labelText: 'Service Provider'
    },
    {
      name: "start",
      labelText: "starts",
      registerOptions: { required: "You must choose a start date." }
    },
    {
      name: "end",
      labelText: "ends",
      registerOptions: { required: "You must choose an end date." }
    }
  ]

  const completionInputs = [
    {
      name: "dateCompleted",
      openModalWithNewDate: true,
      registerOptions: !isCompleted && { value: new Date() },
      labelText: "date completed"
    },
    {
      name: "completionComments",
      labelText: "comments"
    },
    {
      name: 'cost',
      labelText: 'Total Cost'
    }
  ]

  const CompleteTaskButton = () => !shouldShowCompletion && (
      <Button 
        important 
        fullWidth 
        fadeIn
        margin="1em 0 0 0"
        type='button' 
        onClick={() => setUndergoingCompletion(true)}
      >
        Complete Task
      </Button>      
  )

  return isCompletedHandled && (
    <Page>
      <PageContainer flexColumn>
        <FormTemplate
          titleText="Details"
          inputs={entryDetailsInputs} 
          formMode='details' 
          detailsUrl={getEntryRoute} 
          onSubmit={updateEntry} 
          addModeCancel={history.goBack}
          AfterTemplate={<CompleteTaskButton />}
        />
        {shouldShowCompletion && <FormSeparator />}
        <FormTemplate 
          popup
          popupCondition={shouldShowCompletion}
          titleText={isCompleted ? "Completion" : "Complete Task"}
          inputs={completionInputs}
          formMode={isCompleted ? "details" : "add"} 
          detailsUrl={getEntryRoute}
          onSubmit={updateEntry}
          addModeCancel={() => setUndergoingCompletion(false)}
        />
        <FlexSection fadeIn fullWidth marginTop1em>
          <DeleteEntryButton fullWidth fullHeight entryId={id} />
          <Button fullWidth onClick={() => history.push(`/calendar`)}>BACK TO CALENDAR</Button>
        </FlexSection>
      </PageContainer>
    </Page>
  )
}

export default EntryDetails
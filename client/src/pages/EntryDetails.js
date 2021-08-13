import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, FormSeparator, Button } from '../common'
import SuperForm from '../components/SuperForm/SuperForm'
import DeleteEntryButton from '../components/DeleteEntryButton'
import { useHandleUserStatus, useUpdateEntry } from '../functions'
import DisplayHomeFromId from '../components/SuperForm/DisplayHomeFromId'
import { useItemTasksSelect } from '../components/SuperForm/DynamicSelects'
import GroupOfInputs from '../components/SuperForm/GroupOfInputs'


const EntryDetails = () => {
  useHandleUserStatus()
  const { id } = useParams()
  const history = useHistory()
  const updateEntry = useUpdateEntry()
  const { selectedTask, ItemTasksSelect } = useItemTasksSelect()
  const [isCompleted, setIsCompleted] = useState(false)
  const [undergoingCompletion, setUndergoingCompletion] = useState(false)
  const [isCompletedHandled, setIsCompletedHandled] = useState(false)
  // const { SuperForm: DetailsForm } = useSuperForm()
  // const { SuperForm: CompletionForm, setValue: completionSetValue } = useSuperForm()

  const shouldShowCompletion = (isCompleted || undergoingCompletion)
  const getEntryRoute = `/api/calendarEntry/get/${id}`

  const recurrenceDate = useMemo(() => {
    let tempDate = new Date()

    if (selectedTask?.frequency) tempDate.setDate(tempDate.getDate() + selectedTask?.frequency)

    return tempDate

  }, [selectedTask])

  // useEffect(() => completionSetValue("nextRecurringDate", recurrenceDate), [recurrenceDate, completionSetValue])


  useEffect(() => {
    console.log('recurrenceDate memo. selectedTask?.frequency: ', selectedTask?.frequency)
    console.log("recurrenceDate: ", recurrenceDate)
    console.log("typeof recurrenceDate: ", typeof recurrenceDate)

  }, [selectedTask, recurrenceDate])
  
  

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
      readOnly: true,
    },
    {
      name: "task",
      isCustomComponent: true,
      as: ItemTasksSelect,
      registerOptions: { required: "You must choose a task." }
    },
    {
      name: "notes",

    },    
<<<<<<< HEAD
=======
    { 
      labelText: "Service Provider",
      labelProps: { as: "h2", fontSize: '1em' },
      isCustomComponent: true,
      forwardErrors: true,
      as: GroupOfInputs,
      inputs: [
        {
          name: "serviceProviderInfo.name",
          labelText: "Name",
          wrapperProps: {gridColumn: '1/2'}
        },
        {
          name: "serviceProviderInfo.phoneNumber",
          labelText: "Phone Number",
          wrapperProps: {gridColumn: '3/4'}
        }
      ]
    },
>>>>>>> 4f9eeca57cee9ce8bebaaa29ebddf125055f4437
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
      name: 'serviceProviderInfo',
      labelText: 'Service Provider'
    },
    {
      name: "completionComments",
      labelText: "comments"
    }, 
    {
      name: 'cost',
      labelText: 'Total Cost',
      type: 'number'
    },
    !isCompleted && {
      name: "nextRecurringDate",
      labelText: 'Next Recurring Date',
      labelProps: { as: "h2", fontSize: '1em' },
      openModalWithNewDate: true,
      registerOptions: { value: recurrenceDate },
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
        <SuperForm
          titleText="Details"
          inputs={entryDetailsInputs} 
          formMode='details' 
          detailsUrl={getEntryRoute} 
          onSubmit={updateEntry} 
          addModeCancel={history.goBack}
          AfterTemplate={<CompleteTaskButton />}
        />
        {shouldShowCompletion && <FormSeparator />}
        <SuperForm
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
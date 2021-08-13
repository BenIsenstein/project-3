import React, { useState, useEffect, useMemo, useCallback } from 'react'
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
  const { homeId, selectedTask, ItemTasksSelect } = useItemTasksSelect()
  const [isCompleted, setIsCompleted] = useState(false)
  const [undergoingCompletion, setUndergoingCompletion] = useState(false)
  const [isCompletedHandled, setIsCompletedHandled] = useState(false)
  // const { SuperForm: DetailsForm } = useSuperForm()
  // const { SuperForm: CompletionForm, setValue: completionSetValue } = useSuperForm()
  const shouldShowCompletion = (isCompleted || undergoingCompletion)
  const getEntryRoute = `/api/calendarEntry/get/${id}`

  const completeEntry = useCallback(async (data) => {
    const { item, task } = selectedTask
    const { nextRecurringDate, userId } = data

    data.newCalendarEntry = { 
      userId,
      homeId,
      item,
      task,
      completed: false,
      start: nextRecurringDate,
      end: nextRecurringDate
    }

    await updateEntry(data)

  }, [homeId, selectedTask, updateEntry])

  const recurrenceDate = useMemo(() => {
    let tempDate = new Date()

    if (selectedTask?.frequency) tempDate.setDate(tempDate.getDate() + selectedTask?.frequency)

    return tempDate

  }, [selectedTask])

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

  const completionInputs = useMemo(() => [
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
      labelText: 'Total Cost',
      type: 'number'
    },
    (!isCompleted && shouldShowCompletion) && {
      name: "nextRecurringDate",
      labelText: 'Next Recurring Date',
      labelProps: { as: "h2", fontSize: '1em' },
      openModalWithNewDate: true,
      registerOptions: { value: recurrenceDate },
    }
  ], 
  [
    isCompleted, 
    recurrenceDate, 
    shouldShowCompletion
  ])

  console.log("")
  console.log("")
  console.log('selectedTask?.frequency: ', selectedTask?.frequency)
  console.log("recurrenceDate: ", recurrenceDate)
  console.log("completionInputs: ", completionInputs)

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
          onSubmit={completeEntry}
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
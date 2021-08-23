import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, FormSeparator, Button } from '../common'
import SuperForm from '../components/SuperForm/SuperForm'
import DeleteEntryButton from '../components/DeleteEntryButton'
import { useHandleUserStatus, useUpdateEntry } from '../functions'
import DisplayHomeFromId from '../components/SuperForm/DisplayHomeFromId'
import { useItemTasksSelect } from '../components/SuperForm/DynamicSelects'
import GroupOfInputs from '../components/SuperForm/GroupOfInputs'
import StartAndEndDates from '../components/SuperForm/StartAndEndDates'
import FindServicesButton from '../components/FindServicesButton'
import UserContext from '../UserContext'

const EntryDetails = () => {
  useHandleUserStatus()
  const { id } = useParams()
  const history = useHistory()
  const userContext = useContext(UserContext)
  const updateEntry = useUpdateEntry()
  const { homeId, selectedTask, ItemTasksSelect } = useItemTasksSelect()
  const [isCompleted, setIsCompleted] = useState(false)
  const [undergoingCompletion, setUndergoingCompletion] = useState(false)
  const [isCompletedHandled, setIsCompletedHandled] = useState(false)
 
  const shouldShowCompletion = (isCompleted || undergoingCompletion)
  const getEntryRoute = `/api/calendarEntry/get/${id}`

  const completeEntry = useCallback(async (data) => {
    const { item, task } = selectedTask

    data.newCalendarEntry = { 
      userId: userContext.user?._id,
      homeId,
      item,
      task,
      completed: false,
      start: data.nextRecurringDate,
      end: new Date(data.nextRecurringDate.setHours(13,0,0))
    }

    await updateEntry(data)

  }, [homeId, selectedTask, userContext.user, updateEntry])

  const updateCompletion = async (data) => {
    data.completed = true
    await updateEntry(data)
  }

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
      as: DisplayHomeFromId,
      asName: "DisplayHomeFromId"
    },
    {
      name: "item",
      readOnly: true,
    },
    {
      name: "task",
      isCustomComponent: true,
      as: ItemTasksSelect,
      asName: "ItemTasksSelect",
      registerOptions: { required: "You must choose a task." }
    },
    {
      name: "notes",
      placeholder: "< ...service providers, description, etc  >"
    },    
    {
      isCustomComponent: true,
      forwardErrors: true,
      readOnly: true,
      as: StartAndEndDates,
      asName: "StartAndEndDates",
      inputs: [
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
    }
  ]

  const completionInputs = useMemo(() => {
    const completionInputs = [
      {
        name: "dateCompleted",
        labelText: "date completed",
        registerOptions: { required: "You must select a date completed." },
        isCompleted: isCompleted
      },
      { 
        labelText: "Service Provider",
        labelProps: { as: "h2", fontSize: '1em' },
        isCustomComponent: true,
        forwardErrors: true,
        as: GroupOfInputs,
        asName: "GroupOfInputs",
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
        name: "completionComments",
        labelText: "comments"
      }, 
      {
        name: 'cost',
        labelText: 'Total Cost',
        type: 'number',
        step: '0.01'
      }
    ]

    if (!isCompleted) completionInputs.push({
      name: "nextRecurringDate",
      labelText: 'Next Recurring Date',
      labelProps: { as: "h2", fontSize: '1em' },
      recurrenceFrequency: selectedTask?.frequency
    })

    return completionInputs 
  }, 
  [isCompleted, selectedTask])

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
          BeforeTemplate={<FindServicesButton taskId={id} />}
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
          openInEditView={!isCompleted}
          editViewCancel={!isCompleted && (() => setUndergoingCompletion(false))}
          titleText={!isCompleted ? "Complete Task" : "Completed"}
          inputs={completionInputs}
          formMode={"details"} 
          detailsUrl={getEntryRoute}
          onSubmit={!isCompleted ? completeEntry : updateCompletion}
        />
        <FormSeparator />
        <FlexSection fadeIn fullWidth marginTop1em>
          <DeleteEntryButton fullWidth fullHeight entryId={id} />
          <Button fullWidth onClick={() => history.push(`/calendar`)}>BACK TO CALENDAR</Button>
        </FlexSection>
      </PageContainer>
    </Page>
  )
}

export default EntryDetails
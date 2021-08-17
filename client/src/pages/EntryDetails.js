import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, FlexSection, FormSeparator, Button } from '../common'
import SuperForm from '../components/SuperForm/SuperForm'
import DeleteEntryButton from '../components/DeleteEntryButton'
import { useHandleUserStatus, useUpdateEntry } from '../functions'
import DisplayHomeFromId from '../components/SuperForm/DisplayHomeFromId'
import { useItemTasksSelect } from '../components/SuperForm/DynamicSelects'
import GroupOfInputs from '../components/SuperForm/GroupOfInputs'
import StartAndEndDates from '../components/SuperForm/StartAndEndDates'


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
  
  // - - - - - LOGS TO FIND OUT ISCOMPLETED, SHOULdSHOWCOMPLETION - - - - -
  console.log("isCompleted: ", isCompleted)
  console.log("shouldShowCompletion: ", shouldShowCompletion)

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
      end: new Date(nextRecurringDate.setHours(13,0,0))
    }

    await updateEntry(data)

  }, [homeId, selectedTask, updateEntry])

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
      name: "notes"
    },    
    {
      isCustomComponent: true,
      forwardErrors: true,
      readOnly: true,
      as: StartAndEndDates,
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

    console.log("completionInputs: ", completionInputs)
    return completionInputs 
  }, 
  [isCompleted, selectedTask])

  console.log("")
  console.log("")
  console.log('selectedTask?.frequency: ', selectedTask?.frequency)

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

  const FindLocalServicesButton = () => {
        // example URL = https://www.google.com/maps/search/?api=1&query=service+provider+roof+inspect+Calgary+AB
        let URL = "https://www.google.com/maps/search/?api=1&query=service+provider"

        // Capture the city and country from the Home's address.
        let city = 'Calgary'
        let country = 'Canada'
    
        // Capture the Item and Task related to the event.
        let urlSearchItem = 'roof'
        let urlItemPased = 'roof'
        let urlSearchTask = 'inspect the roof'
        let urlTaskParsed = 'inspect+the+roof'
    
        // If HOME is populated...
        URL = URL + '+' + city + '+' + country
        // If ITEM is populated...
        URL = URL + '+' + urlItemPased
        // If TASK is populated...
        URL = URL + '+' + urlTaskParsed

    return (
      <Button 
        fadeIn
        margin="1em 0 0 0"
        type='button'
        // justify-content= 'flex-end'
        // text-align= 'left'
        // align-items= 'left' 
        onClick={() => window.open(URL)}
      >
        Find Local Services
      </Button>     
    )
  }

  // const findByGoogle = () => {
  //   // example URL = https://www.google.com/maps/search/?api=1&query=service+provider+roof+inspect+Calgary+AB
  //   let URL = "https://www.google.com/maps/search/?api=1&query=service+provider+"

  //   // Capture the city and country from the Home's address.
  //   let city = 'Calgary'
  //   let country = 'Canada'

  //   // Capture the Item and Task related to the event.
  //   let urlSearchItem = 'roof'
  //   let urlItemPased = 'roof'
  //   let urlSearchTask = 'inspect the roof'
  //   let urlTaskParsed = 'inspect+the+roof'

  //   URL = URL + '+' + city + '+' + country + '+' + urlItemPased + '+' + urlTaskParsed
  //   // window.open(URL, "_blank")
  //   window.open(URL)
  // }
    
    
  return isCompletedHandled && (
    <Page>
      <PageContainer flexColumn>
        {/* <Button 
          important 
          // fullWidth 
          fadeIn
          // margin="1em 0 0 0"
          // margin="1em"
          type='button' 
          onClick={findByGoogle()}
        >
          Find Local Services
        </Button> */}

        <SuperForm
          BeforeTemplate={<FindLocalServicesButton />}
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
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import FilterModal from '../components/Filter/FilterModal'
import { ListIcon, CalendarIcon, AddIcon, ExitIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection, EnvelopeIcon } from '../common'
import './Calendar.css'

import UserContext from '../UserContext'

const Calendar = () => {
  const [viewMode, setViewMode] = useState('ListView')
  const userContext = useContext(UserContext)

  //define state for refreshing the list view
  const [refresh, setRefresh] = useState()
  const reRenderList = () => setRefresh({})
  let history = useHistory()

  const notifyByEmail = async () => {
    let action = "/api/sendEmail/user"
    let options = {
      method: 'post',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // "email": `${userContext.user.email}`,
        "email": "artt@shaw.ca",
        "type": "reminder",
        "firstname": `${userContext.user.firstName}`,
        "home": "79 Panora Hts",
        "item": "Gutters",
        "task": "this is the task",
        "description": "task described",
        "date": "date to be performed"
      })
    }

    try {
      let res = await fetch(action, options)
      let resObject = await res.json()
      console.log("Response from server = ", resObject)
      if (resObject.success) alert("Call to server API Successful!")

      if (!resObject.success) alert("Your call to the sendEmail API failed for some reason. Please try again.")
    }
    catch (err) {
      console.log('error calling sendEmail API: ', err)
      alert("There was an error calling the sendEmail API. We're fixing it as fast as we can.")
    }
  }

  return (
    <Page>
      <PageContainer>
        <FlexSection spaceBetween>
          <FlexSection>
            <Button onClick={() => history.push(`/new-task`)}><AddIcon />New Task</Button>
          </FlexSection>

          <FlexSection>
            <EnvelopeIcon onClick={notifyByEmail} />
          </FlexSection>

          <FlexSection>
            <Button onClick={() => userContext.logOut()}><ExitIcon />Log Out</Button>
          </FlexSection>

          <FlexSection>
            <SwitchViewButton
              activeView={viewMode === 'ListView'}
              onClick={() => setViewMode('ListView')}
            >
              <ListIcon />
            </SwitchViewButton>
            <SwitchViewButton
              activeView={viewMode === 'CalendarView'}
              onClick={() => setViewMode('CalendarView')}
            >
              <CalendarIcon />
            </SwitchViewButton>
          </FlexSection>
        </FlexSection>

        <p>Welcome to your home calendar, {userContext.userName}!</p>

        <FilterModal />

        {viewMode === 'ListView' && <CalendarListView reRenderList={reRenderList} />}
      </PageContainer>
    </Page>
  )
}

export default Calendar
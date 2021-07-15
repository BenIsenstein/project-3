import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import FilterModal from '../components/Filter/FilterModal'
import { ListIcon, CalendarIcon, AddIcon, ExitIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection } from '../common'
import TestEmailButton from '../components/TestEmailButton'
import './Calendar.css'

import UserContext from '../UserContext'

const Calendar = () => {
  const [viewMode, setViewMode] = useState('ListView')
  const userContext = useContext(UserContext)

  //define state for refreshing the list view
  const [refresh, setRefresh] = useState()
  const reRenderList = () => setRefresh({})
  let history = useHistory()

  return (
    <Page>
      <PageContainer>
        <FlexSection spaceBetween>
          <FlexSection>
            <Button onClick={() => history.push(`/new-task`)}><AddIcon />New Task</Button>
          </FlexSection>

          <FlexSection>
            <TestEmailButton />
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
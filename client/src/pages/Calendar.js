import React, { useEffect, useState, useMemo, useContext } from "react"
import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import FilterModal from '../components/Filter/FilterModal'
import { ListIcon, PersonIcon, CalendarIcon, AddIcon, ExitIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection } from '../common'
import TestEmailButton from '../components/TestEmailButton'
import './Calendar.css'
import entry from "react-datetime-picker"

const Calendar = () => {
  let history = useHistory()
  const [viewMode, setViewMode] = useState('ListView')
  const userContext = useContext(UserContext)

  // if user is not logged in, redirect to landing
  useEffect(() => {if (!userContext.isLoggedIn) history.push('/')}, [userContext.isLoggedIn, history])

  // states for filters (active/completed/all)
  // has the same names but different from states in FilterModal
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState({
    active: true,
    completed: false
  })

  function handleFilterChange(active, completed, all) {
    setChecked({active: active, completed: completed})
    setCheckedAll(all)
  }

  //define state for refreshing the list view
  const [loaded, setLoaded] = useState(false)

  // Template for declaring useState() and setNoneFound()
  const entryTemplate = useMemo(() => {
    return { 
      date: " ", 
      entries: [{ title: " ", date: " ", item: " ", task: " " }] 
    }
  }, [])

  // State for entries
  const [dates, setDates] = useState([{ 
    date: "Loading...", 
    entries: [{}] 
  }])

  const [filteredDates, setFilteredDates] = useState([{ 
    date: "Loading...", 
    entries: [{}] 
  }])

  // Function in case the user's calendar is empty
  const setNoneFound = useMemo(() => () => setFilteredDates([{ date: "Please add a new task", entries: [{}] }]), [])

  // Effect to fetch all entries
  useEffect(() => {
    if (!userContext.user) return

    const fetchCalendarEntries = async () => {
      setDates([{ 
        date: "Loading...", 
        entries: [{}] 
      }])
    
      try {
        // fetch all calendar entries for current authenticated user
        let entriesResponse = await fetch(`/api/calendarEntry/getbyuser/${userContext.user._id}`)
        let resObject = await entriesResponse.json()
        let list = resObject.calendarEntryList
        if (!list.length) return setNoneFound()
        // Make a Date object out of the entry.date ISO string,
        // Use built-in method to grab nice-looking string

        let datesArray = []

        // Fill datesArray with a string for each unique date
        for (let entry of list) {
          entry.date = new Date(entry.date).toDateString()
          if (!datesArray.includes(entry.date)) datesArray.push(entry.date)
        }

        // Turn each date string into the full structure with an empty array for <SingleEntries />
        datesArray = datesArray.map(date => {return {date: date, entries: [] }})
        
        // Fill each date with matching entries
        for (let date of datesArray) {
          for (let entry of list) {
            if (entry.date === date.date) {
              delete entry.date
              date.entries.push(entry)
            }
          }
        }
      
        setDates(datesArray) 
        setLoaded(true)
      }  
      catch (err) {
        setNoneFound()
        console.log(err)
        alert(`
          There was an error loading your calendar. 
          We're fixing it as fast as we can.
        `)
      }
    }

    fetchCalendarEntries()
  }, [userContext.user, setNoneFound])

  useEffect(() => {
    if (!loaded) return

    const returnAll = entry => true
    const returnActive = entry => !entry.completed
    const returnCompleted = entry => entry.completed

    setFilteredDates(dates.map(date => { 
      let filteredEntries = date.entries.filter(entry => 
        checkedAll ? returnAll(entry) : 
          checked.active ? returnActive(entry) : 
            checked.completed ? returnCompleted(entry) : 
              returnActive(entry)
      )

      return {
        date: date.date, 
        entries: filteredEntries
      }
    }))
  }, [checked.active, checked.completed, checkedAll, loaded, dates])

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
            <Button onClick={() => history.push('account')}><PersonIcon /></Button>
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

        <FlexSection fullWidth spaceBetween>
          {<p>Welcome to your home calendar, {userContext.userName}!</p>}                   
          <FilterModal           
            checkedAll={checkedAll}
            setCheckedAll={setCheckedAll}
            checked={checked}
            setChecked={setChecked} 
            handleFilterChange={handleFilterChange}
          />                    
        </FlexSection>

        {viewMode === 'ListView' && <CalendarListView dates={filteredDates} />}
      </PageContainer>
    </Page>
  )
}

export default Calendar
import React, { useEffect, useState, useMemo, useContext } from "react"
import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'
import CalendarListView from '../components/CalendarListView/CalendarListView'
import FilterModal from '../components/Filter/FilterModal'
import { ListIcon, CalendarIcon, AddIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection } from '../common'
import './Calendar.css'
import CalendarView from '../components/CalendarView/CalendarView'

const Calendar = () => {
  let history = useHistory()
  const [viewMode, setViewMode] = useState('CalendarView')
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
  
  // State for entries
  const [dates, setDates] = useState([])

  const [filteredDates, setFilteredDates] = useState([])

  // Function in case the user's calendar is empty
  const setNoneFound = useMemo(() => () => setFilteredDates([]), [])

  // Effect to fetch all entries
  useEffect(() => {
    if (!userContext.user) return

    const fetchCalendarEntries = async () => {
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
          entry.start = new Date(entry.start)
          let currentDateString = entry.start.toDateString()
          if (!datesArray.includes(currentDateString)) datesArray.push(currentDateString)
        }

        // Turn each date string into the full structure with an empty array for <SingleEntries />
        datesArray = datesArray.map(dateString => {return { date: dateString, entries: [] }})
        
        // Fill each date with matching entries
        for (let date of datesArray) {
          for (let entry of list) {
            if (entry.start.toDateString() === date.date) {
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

    setFilteredDates(dates
      .map(date => {
        let { active, completed } = checked

        let filteredEntries = date.entries
          .filter(entry => 
            active && completed ? returnAll(entry) : 
              active ? returnActive(entry) : 
                completed ? returnCompleted(entry) : 
                  returnActive(entry) 
        )
  
        return {
          date: date.date, 
          entries: filteredEntries
        }
      })
      .filter(date => 
        date.entries.length 
      )
    )
      
  }, [checked, loaded, dates])

  // useEffect(() => console.log('dates: ', dates), [dates])
  // useEffect(() => console.log('filteredDates: ', filteredDates), [filteredDates])

  return (
    <Page>
      <PageContainer>
        <FlexSection spaceBetween>
          <FlexSection>
            <Button onClick={() => history.push(`/new-task`)}><AddIcon />New Task</Button>
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
          {<p>Welcome to your home calendar, {userContext.user?.firstName}!</p>}                   
          <FilterModal handleFilterChange={handleFilterChange} />                    
        </FlexSection>

        {viewMode === 'ListView' && 
          (filteredDates.length 
            ? <CalendarListView dates={filteredDates} /> 
            : <p>You have no {checked.active ? "upcoming" : "completed"} tasks</p>
            )
        }
        {viewMode === 'CalendarView' && <CalendarView dates={filteredDates} />}
      </PageContainer>
    </Page>
  )
}

export default Calendar
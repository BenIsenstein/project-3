import React, { useEffect, useState, useMemo, useContext } from "react"
import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'
import CalendarListView from '../components/CalendarListView/CalendarListView'
import FilterModal from '../components/Filter/FilterModal'
import { ListIcon, CalendarIcon, AddIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection } from '../common'
import './Calendar.css'
import CalendarView from '../components/CalendarView/CalendarView'

const Calendar = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [viewMode, setViewMode] = useState('CalendarView')
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState({
    active: true,
    completed: false
  })
  const handleFilterChange = (active, completed, all) => {
    setChecked({active: active, completed: completed})
    setCheckedAll(all)
  }
  const [loaded, setLoaded] = useState(false)
  const [dates, setDates] = useState([])
  const [filteredDates, setFilteredDates] = useState([])
  const setNoneFound = useMemo(() => () => setDates([]), [])

  // Effect to log user out if they're not logged in
  useEffect(() => {if (!userContext.isLoggedIn) history.push('/')}, [userContext.isLoggedIn, history])

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

        // Fill datesArray with a string for each unique date
        let datesArray = []
        for (let entry of list) {
          console.log('entry.start: ', entry.start)
          entry.start = new Date(entry.start)
          let dateString = entry.start.toDateString()
          if (!datesArray.includes(dateString)) datesArray.push(dateString)
        }

        // Turn each date string into the full structure with a string as the 'date',
        // and an array full of matching entries as the 'entries'
        datesArray = datesArray.map(dateString => {
          return { 
            date: dateString, 
            entries: list.filter(entry => entry.start.toDateString() === dateString) 
          }
        })
      
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

  return (
    <Page>
      <PageContainer>
        <FlexSection spaceBetween>
            <Button onClick={() => history.push(`/new-task`)}><AddIcon />New Task</Button>
            
            <FlexSection>
              <SwitchViewButton activeView={viewMode === 'ListView'} onClick={() => setViewMode('ListView')}>
                <ListIcon />
              </SwitchViewButton>
              <SwitchViewButton activeView={viewMode === 'CalendarView'} onClick={() => setViewMode('CalendarView')}>
                <CalendarIcon />
              </SwitchViewButton>
            </FlexSection>
          
          <FilterModal handleFilterChange={handleFilterChange} /> 
        </FlexSection>

        {viewMode === 'ListView' && 
          (filteredDates.length 
            ? <CalendarListView dates={filteredDates} /> 
            : <p>You have no {checked.active ? "upcoming" : "completed"} tasks</p>
          )
        }
        {viewMode === 'CalendarView' && <>
          {!dates.length && <p>{userContext.user?.firstName}, add your first task now!</p>}
          <CalendarView dates={filteredDates} />
        </>}
      </PageContainer>
    </Page>
  )
}

export default Calendar
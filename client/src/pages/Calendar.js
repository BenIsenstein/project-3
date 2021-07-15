import React, { useEffect, useState, useMemo, useContext } from "react"
import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import FilterModal from '../components/Filter/FilterModal'
import { ListIcon, CalendarIcon, AddIcon, ExitIcon, SwitchViewButton, Button, Page, PageContainer, FlexSection } from '../common'
import TestEmailButton from '../components/TestEmailButton'
import './Calendar.css'
import entry from "react-datetime-picker"

const Calendar = () => {
  const [viewMode, setViewMode] = useState('ListView')
  const userContext = useContext(UserContext)

  // states for filters (active/completed/all)
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState({
      active: true,
      completed: false
  })

  //define state for refreshing the list view
  const [refresh, setRefresh] = useState()
  const reRenderList = () => setRefresh({})
  let history = useHistory()


  // COPIED FROM LIST VIEW!!!!!!!! AHHH!!!!

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
    entries: [] 
  }])

  const [filteredDates, setFilteredDates] = useState(dates)

  // Function in case the user's calendar is empty
  const setNoneFound = useMemo(() => 
    () => setDates([{ 
      date: "Please add a new task", 
      entries: []  
    }]), 

  [])

  // Effect to fetch all entries
  useEffect(() => {
    if (userContext.user !== undefined) {
      const fetchCalendarEntries = async () => {
        setDates([{ 
          date: "Loading...", 
          entries: [] 
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
            let date = new Date(entry.date).toDateString()
            entry.date = date
            if (!datesArray.includes(date)) datesArray.push(date)
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
    }
  // }, [entryTemplate, setNoneFound, reRenderList])
  }, []) // removed guard conditions to prevent infinite loop

  useEffect(() => {
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

    // setFilteredDates(filteredDates.filter(date => date.entries.length > 0))
  }, [checked.active, checked.completed, checkedAll])

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

        <FlexSection fullWidth spaceBetween>
          <p>Welcome to your home calendar, {userContext.userName}!</p>                    
          <FilterModal           
            checkedAll={checkedAll}
            setCheckedAll={setCheckedAll}
            checked={checked}
            setChecked={setChecked} 
          />                    
        </FlexSection>

        {viewMode === 'ListView' && <CalendarListView reRenderList={reRenderList} dates={filteredDates} />}
      </PageContainer>
    </Page>
  )
}

export default Calendar
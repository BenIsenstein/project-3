import React, { useEffect, useState, useMemo, useContext } from "react"
import UserContext from '../UserContext'
import FilterContext from '../FilterContext'
import { useHistory } from 'react-router-dom'
import FilterModal from '../components/Filter/FilterModal'
import { AddIcon, Button, Page, PageContainer, FlexSection } from '../common'
import './Calendar.css'
import CalendarView from '../components/CalendarView/CalendarView'
import { useHandleUserStatus } from "../functions"
import entry from "react-datetime-picker"

const Calendar = () => {
  useHandleUserStatus()
  const history = useHistory()
  const userContext = useContext(UserContext)
  const filterContext = useContext(FilterContext)
  // const [checkedAll, setCheckedAll] = useState(false)
  // const [checked, setChecked] = useState({
  //   active: true,
  //   completed: false
  // })

  const handleFilterChange = (active, completed, homes, all) => {
    // setChecked({active: active, completed: completed})
    // setCheckedAll(all)
    
    // Set global context for FILTER settings to persist 
    // when changing pages/components.
    let filterInfo = {
      active: active,
      completed: completed,
      homes: homes
    }
    filterContext.setFilterInfo(filterInfo)
  }

  const [loaded, setLoaded] = useState(false)
  const [isDatesEmpty, setIsDatesEmpty] = useState(false)
  const [dates, setDates] = useState([])
  const [filteredDates, setFilteredDates] = useState([])
  const setNoneFound = useMemo(() => () => {setDates([]); setIsDatesEmpty(true)}, [])

  // Effect to fetch all entries
  useEffect(() => {
    if (!userContext.user) return

    const fetchCalendarEntries = async () => {
      try {
        // fetch all calendar entries for current authenticated user
        let entriesRes = await fetch(`/api/calendarEntry/getbyuser/${userContext.user._id}`)
        let entriesObject = await entriesRes.json()
        let list = entriesObject.entryList
        let datesArray = []
        // prepare list by making 'start' into a Date object
        list.every(entry => entry.start = new Date(entry.start))

        if (!list.length) return setNoneFound()

        // build datesArray
        for (let entry of list) {
          let dateString = entry.start.toDateString()

          if (!datesArray.some(item => item.date === dateString)) {
            let date = { 
              date: dateString, 
              entries: list.filter(entry => entry.start.toDateString() === dateString) 
            }

            datesArray.push(date)
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

    let homes = filterContext.homes
    // let homes = [
    //   // {id: "61099f342ec65716b4b37d96", nickname: "Brentwood"},
    //   // {id: "6102b61836986f2db048502d", nickname: "Candiac"}
    // ]

    const returnAll = entry => {
      if (homes?.length > 0) {
        // return true && homes.some(object => object.id == entry.homeId)
        return true && homes.some(object =>  (object.id === entry.homeIcon) && (object.id === entry.homeId) && (object.status))
      } else {
        return true
      } 
    }
    const returnActive = entry => {
      if (homes?.length > 0) {
        // return !entry.completed && homes.some(object => object.id == entry.homeId)
        return !entry.completed && homes.some(object =>(object.id === entry.homeIcon) && (object.id === entry.homeId) && (object.status))
      } else {
        return !entry.completed
      } 
    }
    const returnCompleted = entry => {
      if (homes?.length > 0) {
        // return entry.completed && homes.some(object => object.id == entry.homeId)
        return entry.completed && homes.some(object => (object.id === entry.homeIcon) && (object.id === entry.homeId) && (object.status))
      } else { 
        return entry.completed
      }
    }    

    // const returnHomes = entry => entry.some(object => object.id == entry.homeId) 

    setFilteredDates(dates
      .map(date => {
        // let { active, completed } = checked
        let active = filterContext.active
        let completed = filterContext.completed

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
  }, [filterContext, loaded, dates])
  // }, [checked, loaded, dates])

  return (
    <Page>
      <PageContainer>
        <FlexSection spaceBetween>
          <Button onClick={() => history.push(`/new-task`)}><AddIcon />New Task</Button>
          <FilterModal handleFilterChange={handleFilterChange} /> 
        </FlexSection>
        
        <CalendarView dates={filteredDates} />
        {isDatesEmpty && <p>{userContext.user?.firstName}, add your first task now!</p>}
      </PageContainer>
    </Page>
  )
}

export default Calendar
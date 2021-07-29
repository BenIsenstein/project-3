import { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import FilterContext from './FilterContext'

const FilterProvider = ({ children }) => {
  const history = useHistory()
  // const redirectHome = () => history.push('/calendar')
  const [active, setActive] = useState(true)
  const [completed, setCompleted] = useState(false)

  const setFilterInfo = (filterInfo) => {
    setActive(filterInfo.active)
    setCompleted(filterInfo.completed)
  }

  // Using the current USER INFO, set the FILTER values
  // according to their preferences.
  // useEffect(() => {
  //   const getUserFilterPreferences = async () => {
  //     try {
  //       let response = await fetch('/api/user/getloggedinuser')
  //       let userObject = await response.json()

  //       if (userObject.no_user) return setUserName("no_user")
  //       console.log('getLoggedInUser userObject: ', userObject)

  //       // fetch for all homes here before concatenating with the userObject??
        
  //       setFilterInfo(userObject)
  //     }
  //     catch (err) {
  //       console.log('error running checkLoggedInUser: ', err)
  //       alert("There was an error checking your login status. We're fixing it as fast as we can.")
  //     }
  //   }

  //   getUserFilterPreferences()
  // }, [])
  
 let contextValue = {
   active,
   completed,
   setFilterInfo
 }

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
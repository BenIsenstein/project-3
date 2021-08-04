import { useState, useEffect, useContext } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import FilterContext from './FilterContext'
import UserContext from './UserContext'

const FilterProvider = ({ children }) => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  // const redirectHome = () => history.push('/calendar')
  const [active, setActive] = useState(true)
  const [completed, setCompleted] = useState(false)

  const setFilterInfo = (filterInfo) => {
    setActive(filterInfo.active)
    setCompleted(filterInfo.completed)
  }

  // When USER CONTEXT changes, use the current user account info to
  // set the FILTER values according to their preferences.
  useEffect(() => {
    if (userContext.user) {
      if ('settings' in userContext.user) {
        if ('filterPrefs' in userContext.user.settings){
          let userFilterPrefs = userContext.user.settings.filterPrefs

          setFilterInfo(userFilterPrefs)
        }
        else {
          console.log("FilterProvider UseEffect: No FILTER PREFERENCE for user found!!!")
        }
      }
      else {
        console.log("FilterProvider UseEffect: No SETTINGS for user found!!!")
      }
    }
  }, [userContext.user])

  
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
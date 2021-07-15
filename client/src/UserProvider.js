import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from './UserContext'

const UserProvider = ({ children }) => {
  const history = useHistory()
  const redirectHome = () => history.push('/calendar')
  const [user, setUser] = useState()
  const [userName, setUserName] = useState('loading')
  const [userType, setUserType] = useState(user?.userType)
  let isLoggedIn = !["loading", "no_user"].includes(userName)
  let isLoading = userName === "loading"

  const setUserInfo = (userInfo) => {
    let { firstName, lastName, userType } = userInfo

    setUser(userInfo)
    setUserName(firstName + ' ' + lastName)
    setUserType(userType)
  }

  useEffect(() => {
    const getLoggedInUser = async () => {
      console.log('getting logged in user in provider!')
      try {
        let response = await fetch('/api/user/getloggedinuser')
        let userObject = await response.json()

        if (!userObject) return setUserName("no_user")

        setUserInfo(userObject)
      }
      catch (err) {
        console.log('error running checkLoggedInUser: ', err)
        alert("There was an error checking your login status. We're fixing it as fast as we can.")
      }
    }

    getLoggedInUser()
  }, [])

  const logIn = async (data) => {
    let loginOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let response = await fetch('/api/auth/login', loginOptions)

    if (response.status === 401) return alert('Unable to log in. Please make sure your login info is correct.')
    
    let loggedInUser = await response.json()
    setUserInfo(loggedInUser)
    
    history.push(`/`)
  }

  const logOut = async () => {
    try {
      let response = await fetch("/api/auth/logout")
      let resObject = await response.json()

      if (resObject.isLoggedOutNow) {
        isLoggedIn = false
        setUser(undefined)
        setUserName('no_user')
        setUserType(undefined)

        history.push(`/`)
      }
      else {
        alert('You are still logged in for some reason. Please try logging out again.')
      }
    }
    catch (err) {
      console.log(`Error logging out user ${userName}: `, err)
      alert("There was an error logging you out. We're fixing it as fast as we can.")
    }
  }

  
  let contextValue = {
    user,
    userName,
    userType,
    isLoggedIn,
    isLoading,
    logIn,
    logOut,
    setUserInfo
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
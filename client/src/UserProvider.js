import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from './UserContext'

const UserProvider = ({ children }) => {
    const history = useHistory()
    const redirectHome = () => history.push('/')
    const [user, setUser] = useState()
    const [username, setUsername] = useState('loading')
    const [userType, setUserType] = useState()
    const isLoggedIn = username !== "loading" && username !== "no_user"
    const isLoading = username === "loading"

    useEffect(() => {
        const getLoggedInUser = async () => {
          try {
            let response = await fetch('/api/user/getloggedinuser')
            let resObject = await response.json()
            let user = resObject.user
            
            if (!user) return setUsername("no_user")

            setUser(user)
            setUsername(user.username) 
            setUserType(user.userType)
          }
          catch(err) {
            console.log('error running checkLoggedInUser: ', err)
            alert("There was an error checking your login status. We're fixing it as fast as we can.")
          }
        }
    
        getLoggedInUser()
    }, [])

    const logIn = (email, password) => {
        // async function logintoserver() {
        //     let loginOptions = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ username, password })
        //     }
        //     let response = await fetch('/api/auth/login', loginOptions)
        //     let loggedInUser = await response.json()
        //     console.log('The call to AUTH returned: ', loggedInUser)
        //     setUsername(loggedInUser.username)
        //     setUserType(loggedInUser.userType)    
        // }
        // logintoserver()
    }

    const logOut = async () => {
        try {
          let response = await fetch("/api/user/logout")
          let resObject = await response.json()
    
          if (resObject.isLoggedOutNow) {
            setUser(undefined)
            setUsername('no_user')
            setUserType(undefined)
          }
          else {
            alert('You are still logged in for some reason. Please try logging out again.')
          }
        }
        catch(err) {
          console.log(`Error logging out user ${username}: `, err)
          alert("There was an error logging you out. We're fixing it as fast as we can.")
        }
      }

    let contextValue = {
        user,
        username,
        userType,
        isLoggedIn,
        isLoading,
        logIn,
        logOut
    }

    return (
        <UserContext.Provider value={ contextValue }>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider
import { useState } from 'react'
import UserContext from './UserContext'

const UserProvider = ({ children }) => {

    let [username, setUsername] = useState()
    let [userType, setUserType] = useState()

    const logIn = (username, password) => {
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

    const logOut = () => {
        setUsername(undefined)
        setUserType(undefined)
    }

    let contextValue = {
        username,
        userType,
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
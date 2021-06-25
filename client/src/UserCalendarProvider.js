import { useState } from 'react'
import UserCalendarContext from './UserCalendarContext'

const UserCalendarProvider = ({ children }) => {

    let [username, setUsername] = useState()
    let [userType, setUserType] = useState()
    let [calendarEntries, setCalendarEntries] = useState([{
            id: "12345", 
            entry: { title: "titleholder", date: "dateholder", item: "itemholder", task: "taskholder" } 
        }])

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
        calendarEntries,
        logIn,
        logOut
    }

    return (
        <UserCalendarContext.Provider value={ contextValue }>
            { children }
        </UserCalendarContext.Provider>
    )
}

export default UserCalendarProvider

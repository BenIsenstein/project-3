import React from 'react'

const userCalendarContext = React.createContext({
    // username: '',
    isAgent: false,
    logIn: (username, isAgent) => {}
})

export default userCalendarContext
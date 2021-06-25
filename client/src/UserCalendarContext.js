import React from 'react'

const UserCalendarContext = React.createContext({
    username: '',
    calendarEntries: [{}],
    logIn: (username, userType) => {},
    logOut: () => {}
})

export default UserCalendarContext

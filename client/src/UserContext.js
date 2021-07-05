import React from 'react'

const UserContext = React.createContext({
    username: '',
    logIn: (username, userType) => {},
    logOut: () => {}
})

export default UserContext
import React from 'react'

const UserContext = React.createContext({
    username: '',
    userType: '',
    logIn: (username, userType) => {},
    logOut: () => {}
})

export default UserContext
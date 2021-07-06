import React from 'react'

const UserContext = React.createContext({
    user: undefined,
    username: '',
    userType: '',
    isLoggedIn: false,
    isLoading: false,
    logIn: (username, userType) => {},
    logOut: () => {}
})

export default UserContext
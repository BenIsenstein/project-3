import React from 'react'

const UserContext = React.createContext({
    user: undefined,
    username: '',
    userType: '',
    isLoggedIn: false,
    isLoading: false,
    logIn: (email, password) => {},
    logOut: () => {}
})

export default UserContext
import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import theme from './theme'
import GlobalStyle from "./globalStyles"

import UserContext from './UserContext'
import './App.css';

import Navbar from './components/Navbar/Navbar'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Calendar from './pages/Calendar'
import EntryDetails from './pages/EntryDetails'
import AccountDetails from './pages/AccountDetails'
import AddEntryPage from './pages/AddEntryPage'

const App = () => {
  const userContext = useContext(UserContext)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {userContext.isLoggedIn && <Navbar />}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/task/:id' component={EntryDetails} />
        <Route path='/account' component={AccountDetails} />
        <Route path='/new-task' component={AddEntryPage} />
      </Switch>
    </ThemeProvider>
  )
}

export default App;

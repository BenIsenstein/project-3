import React, { useState, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import theme from './theme'
import GlobalStyle from "./globalStyles"

import UserContext from './UserContext'
import './App.css';

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Navbar/Footer'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Calendar from './pages/Calendar'
import EntryDetails from './pages/EntryDetails'
import Library from './pages/Library'
import AccountDetails from './pages/AccountDetails'
import Settings from './pages/Settings'
import AddEntryPage from './pages/AddEntryPage'
import AddHomePage from './pages/AddHomePage'
import HomeDetails from './pages/HomeDetails'
import InfoPage from './pages/InfoPage'
import Reports from './pages/Reports'
import CostAnalysis from './pages/CostAnalysis'
import Welcome from './pages/Welcome'
import Confirm from './pages/Confirm'


const App = () => {
  const userContext = useContext(UserContext)
  const [activatedHomesLength, setActivatedHomesLength] = useState()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {userContext.isLoggedIn && <Navbar />}
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/library' component={Library} />
          <Route path='/task/:id' component={EntryDetails} />
          <Route path='/account' render={(...props) => (<AccountDetails {...props} setActivatedHomesLength={setActivatedHomesLength} />)} />
          <Route path='/settings' component={Settings} />
          <Route path='/new-task' component={AddEntryPage} />
          <Route path='/new-home' component={AddHomePage} />
          <Route path='/home/:id' render={(...props) => (<HomeDetails {...props} activatedHomesLength={activatedHomesLength} />)} />
          <Route path='/info' component={InfoPage} />
          <Route exact path='/reports' component={Reports} />
          <Route path='/reports/cost-analysis' component={CostAnalysis} />
          <Route path='/welcome' component={Welcome} />
          <Route path='/confirm' component={Confirm} />

        </Switch>
      {userContext.isLoggedIn && <Footer />}
    </ThemeProvider>
  )
}

export default App;

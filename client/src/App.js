import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import theme from './theme'
import GlobalStyle from "./globalStyles"

import UserProvider from './UserProvider'
import './App.css';

import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Calendar from './pages/Calendar'
import EntryDetails from './pages/EntryDetails'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserProvider>
          <GlobalStyle />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/event/:id' component={EntryDetails} />
          </Switch>
        </UserProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App;

import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import theme from './theme'
import GlobalStyle from "./globalStyles"

import UserCalendarProvider from './UserCalendarProvider'
import './App.css';

import Calendar from './pages/Calendar'
import TaskDetails from './pages/TaskDetails'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserCalendarProvider>
        <GlobalStyle />
        <Switch>
          <Route exact path='/' component={Calendar} />
          <Route exact path='/task/:id' component={TaskDetails} />
        </Switch>
      </UserCalendarProvider>      
    </ThemeProvider>
  )
}

export default App;

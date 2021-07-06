import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from "styled-components"
import theme from './theme'
import GlobalStyle from "./globalStyles"

import UserProvider from './UserProvider'
import './App.css';

import Landing from './pages/Landing'
import Signup from './components/User/Signup'
import Calendar from './pages/Calendar'
import TaskDetails from './pages/TaskDetails'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <GlobalStyle />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/signup' component={Signup} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/task/:id' component={TaskDetails} />
        </Switch>
      </UserProvider>      
    </ThemeProvider>
  )
}

export default App;

import './App.css';
import { Switch, Route } from 'react-router-dom'

import UserCalendarProvider from './UserCalendarProvider'

import Calendar from './pages/Calendar'
import TaskDetails from './pages/TaskDetails'

const App = () => {
  return (
    <UserCalendarProvider>
      <Switch>
        <Route exact path='/' component={Calendar} />
        <Route exact path='/task/:id' component={TaskDetails} />
      </Switch>
    </UserCalendarProvider>
  );
};

export default App;

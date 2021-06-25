import './App.css';
import { Switch, Route } from 'react-router-dom'

import UserCalendarProvider from './UserCalendarProvider'

import Calendar from './pages/Calendar.js'

const App = () => {
  return (
    <UserCalendarProvider>
      <Switch>
        <Route exact path='/' component={Calendar} />
      </Switch>
    </UserCalendarProvider>
  );
};

export default App;

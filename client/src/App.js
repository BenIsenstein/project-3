import './App.css';
import { Switch, Route } from 'react-router-dom'

import Calendar from './pages/Calendar.js'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Calendar} />
    </Switch>
  );
};

export default App;

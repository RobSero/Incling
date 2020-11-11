import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/common/Navbar'
import HomePage from './components/homePage/HomePage'
import TaskPage from './components/taskPage/TaskPage'
import NewTaskPage from './components/taskPage/NewTaskPage'
import EditTaskPage from './components/taskPage/EditTaskPage'


function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Switch>
      
      <Route exact path='/:taskId' component={TaskPage} />
      <Route exact path='/:taskId/update' component={EditTaskPage} />
      <Route exact path='/:tiles/:tileId/newtask' component={NewTaskPage} />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/*' component={HomePage} />
    </Switch>
      
    </BrowserRouter>
  );
}

export default App;

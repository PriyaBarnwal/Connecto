import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute'
import Navbar from './components/Navbar'
import HomeContainer from './components/HomeContainer'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import MyProfile from './components/Profile/MyProfile'
import ViewProfile from './components/Profile/ViewProfile'
import ProfileForm from './components/Profile/ProfileForm'
import PeopleSearch from './components/PeopleSearch'
import { checkAuth } from './actions/authActions'
import Alert from './components/Alert'

import './styles/app.css'

import { Provider} from 'react-redux'
import store from './store'

const App = () => {
  useEffect(()=> {
    async function checkauth() { 
    await store.dispatch(checkAuth())
  }
  checkauth()
}, [])

  return (
    //<Portfolio/>
    
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <div className="just-empty"/>
          <Alert/>
          <Route exact path="/" component={HomeContainer}/>
          <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profiles" component={PeopleSearch}/>
            <Route exact path="/profiles/:id" component={ViewProfile}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/myprofile" component={MyProfile}/>
            <PrivateRoute exact path="/editprofile" component={ProfileForm}/>
          </Switch>
        </Fragment>
      </Router>  
    </Provider>
  )
}

export default App;

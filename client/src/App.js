import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute'
import Navbar from './components/Navbar'
import HomeContainer from './components/HomeContainer'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import MyProfile from './components/Profile/MyProfile'
import ViewProfile from './components/Profile/ViewProfile'
import ViewPost from './components/Posts/ViewPost'
import PostForm from './components/Posts/PostForm'
import ProfileForm from './components/Profile/ProfileForm'
import NotFoundPage from './components/NotFoundPage'
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
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="wrapper">
            <div>
              <Navbar/>
              <div className="just-empty"/>
                <Alert/>
                <Switch>
                  <Route exact path="/" component={HomeContainer}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/profiles" component={PeopleSearch}/>
                  <PrivateRoute exact path="/profiles/:id" component={ViewProfile}/>
                  <PrivateRoute exact path="/posts/:id" component={ViewPost}/>
                  <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                  <PrivateRoute exact path="/myprofile" component={MyProfile}/>
                  <PrivateRoute exact path="/editprofile" component={ProfileForm}/>
                  <PrivateRoute exact path="/createPost" component={PostForm}/>
                  <PrivateRoute exact path="/editPost/:id" component={PostForm}/>
                  <Route component={NotFoundPage}/>
                </Switch>
              </div>
            <Footer/>
          </div>
        </Fragment>
      </Router>  
    </Provider>
  )
}

export default App;

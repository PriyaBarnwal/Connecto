import React, {Fragment, useEffect, Suspense} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Footer from './components/Footer'
import { checkAuth } from './actions/authActions'
import Alert from './components/Alert'

import './styles/app.css'
import { Provider} from 'react-redux'
import store from './store'

const HomeContainer  = React.lazy(()=> import('./components/HomeContainer'))
const Login  = React.lazy(()=> import('./components/Login'))
const Register  = React.lazy(()=> import('./components/Register'))
const Dashboard  = React.lazy(()=> import('./components/Dashboard'))
const MyProfile  = React.lazy(()=> import('./components/Profile/MyProfile'))
const ViewProfile  = React.lazy(()=> import('./components/Profile/ViewProfile'))
const ProfileForm  = React.lazy(()=> import('./components/Profile/ProfileForm'))
const NotFoundPage = React.lazy(()=> import('./components/NotFoundPage'))
const PeopleSearch = React.lazy(()=> import('./components/PeopleSearch'))
const ViewPost = React.lazy(()=> import('./components/Posts/ViewPost'))
const PostForm = React.lazy(()=> import('./components/Posts/PostForm'))

const App = () => {
  useEffect(()=> {
    async function checkauth() { 
    await store.dispatch(checkAuth())
  }

  checkauth()
}, [])

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader/>}>
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
      </Suspense>
    </Provider>
  )
}

export default App;

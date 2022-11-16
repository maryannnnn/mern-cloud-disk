import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import './app.css'
import Registration from './authorization/Registration'
import Login from './authorization/Login'
import { checkAuthAction } from "../actions/authActions"
import ListUsers from './user/ListUsers'
import { useDispatch, useSelector } from 'react-redux'

const App = () =>  {

  const dispatch = useDispatch()

  const authLoginR = useSelector((state) => state.authLoginR)
  const { isAuth } = authLoginR  

  useEffect(() => {
    
    if (localStorage.getItem('accessToken')) {
      console.log("localStorage.getItem AccessToken", localStorage.getItem('accessToken'))
      dispatch(checkAuthAction())
    }
  }, [dispatch])

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        {console.log("isAuth App", isAuth)}
        {!isAuth &&
          <Switch>
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
          </Switch>
        }
        {isAuth &&
        <Switch>
          <Route path="/list" component={ListUsers} />
        </Switch>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
 import { NavLink } from 'react-router-dom';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import { logout } from '../../actions/authActions'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
  const authLoginR = useSelector((state) => state.authLoginR)
  const {isAuth} = authLoginR

  const dispatch = useDispatch()

  const submitHandlerLogout = (e) => {
    e.preventDefault()
    dispatch( logout() )
  }

  return(
    <div className='navbar'>
      <img src={Logo} alt="" className="navbar__logo" />
      <div className="navbar__header"><NavLink to="/">MERN CLOUD</NavLink></div>
      {!isAuth && <div className="navbar__login"><NavLink to="/login">Sign-in</NavLink></div>}
      {!isAuth && <div className="navbar__registration"><NavLink to="/registration" >Registration</NavLink></div>}
      {isAuth && <div className="navbar__login"><NavLink to="/list">Users list</NavLink></div>}
      {isAuth && <div className="navbar__login"><NavLink to="/">Profile</NavLink></div>}
      {isAuth && <div className="navbar__login"><NavLink to="/">Edit user</NavLink></div>}
      {isAuth && <div className="navbar__login"><NavLink to="/">Add user</NavLink></div>}
      {isAuth && <div className="navbar__login" onClick={submitHandlerLogout} >Logout</div>}
    </div>
  )
}

export default Navbar
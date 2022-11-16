import $api from '../http/api'
import axios from 'axios'

import {  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT} from '../constants/authConstants'

export const registration = ({name, email, password, passwordConfirm}) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password }})
  try {
    const response = await $api.post('/api/auth/registration', {
      name,
      email,
      password,
      passwordConfirm
    })
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.user })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.user} )
    localStorage.setItem('accessToken', response.data.accessToken)
    console.log(response.data)
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const login = ({email, password}) => async (dispatch) => {
      dispatch( { type: USER_LOGIN_REQUEST, payload: { email, password } } )
      try {
        const response = await $api.post('/api/auth/login', { email, password })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.user} )
        localStorage.setItem('accessToken', response.data.accessToken)
        console.log(response.data)
      } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload:
          error.response && error.response.data.message ? error.response.data.message
            : error.message,
         })
        console.log(error.message)
      }
}

export const logout = () => async (dispatch) => {

  try {
      const resLogout = await $api.post('/api/auth/logout')
      console.log('resLogout', resLogout)
      localStorage.removeItem('accessToken');
      dispatch({ type: USER_LOGOUT });
      document.location.href = '/login'
  } catch (error) {
    console.log(error.message)
  }

}

export const checkAuthAction = () => async (dispatch) => {

  try {
    const response = await axios.get('/api/auth/refresh')
    console.log(response.data)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.user })
    localStorage.setItem('accessToken', response.data.accessToken)
    console.log("This chackAAuthAction Response", response.data)
  } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload:
        error.response && error.response.data.message ? error.response.data.message
            : error.message,
      })
  }
}

 export const loginWithSocial = ( result ) => async (dispatch) => {

     const user = result.user;
     const name = user.displayName
     const email = user.email

     dispatch({ type: USER_LOGIN_REQUEST, payload: { name, email } })
      try {
        const response = await $api.post('/api/auth/soclogin', { name, email })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.user })
        localStorage.setItem('accessToken', response.data.accessToken)
      } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload:
          error.response && error.response.data.message ? error.response.data.message
            : error.message,
         })
      }
 }
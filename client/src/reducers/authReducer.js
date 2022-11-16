import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants/authConstants'

  export const authRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, currentUser: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const authLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { currentUser: action.payload, isAuth: true }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return { currentUser: {}, isAuth: false }
        default:
            return state
    }
}




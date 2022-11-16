import $api from '../http/api'
import axios from 'axios'

import {
USER_LIST_REQUEST,
USER_LIST_SUCCESS,
USER_LIST_FAIL
} from '../constants/userConstants'

export const actionListUsers = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST})
  console.log("actionListUsers 1")
  try {
    const { data } = await $api.get('/api/user/list')
    console.log("actionListUsers 2 data", data)
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message })
  }
}
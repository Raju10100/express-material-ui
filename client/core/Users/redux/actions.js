import {sendingRequest, receivedResponse} from '../../../../redux/http/redux'
import {createAction} from '../../../../redux/utils/redux-utils'
import axios from 'axios'
import axiosRawClient from '../../../../redux/utils/axiosRawClient'

export const FETCH_USER = 'FETCH_USER' // list
export const getUserSuccess = createAction(FETCH_USER, 'id', 'users')
export const getUserId = () => `getUserId`
export const getUser = () => {
  const id = getUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return axios.get('/api/users')
      .then(res => {
        dispatch(receivedResponse(id))
        return dispatch(getUserSuccess(id, res.data))
      })
      .catch(errors => dispatch(receivedResponse(id, {errors})))
  }
}

export const CREATE_SINGLE_USER = 'CREATE_SINGLE_USER' // post
export const createSingleUserSuccess = createAction(CREATE_SINGLE_USER, 'id', 'createSingleUser')
export const createSingleUserId = () => `createSingleUserId`
export const createSingleUser = (userDetails) => {
  const id = createSingleUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return axios.post('/api/users', userDetails)
      .then(data => {
        dispatch(receivedResponse(id))
        return dispatch(createSingleUserSuccess(id, data))
      })
      .catch(errors => {
        return dispatch(receivedResponse(id, errors.response))
      })
  }
}


export const FETCH_SINGLE_USER = 'FETCH_SINGLE_USER' // read
export const fetchSingleUserSuccess = createAction(FETCH_SINGLE_USER, 'id', 'users')
export const fetchSingleUserId = () => `fetchSingleUserId`
export const fetchSingleUser = (userId, token) => {
  const id = fetchSingleUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
   axiosRawClient.get('api/users/'+userId, {headers:{Authorization: `Bearer ${token}`, withCredentials:true}})
      .then(res => {
        dispatch(receivedResponse(id))
        return dispatch(fetchSingleUserSuccess(id, res.data))
      })
      .catch(errors => dispatch(receivedResponse(id, {errors})))
  }
}

export const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER' // read
export const updateSingleUserSuccess = createAction(UPDATE_SINGLE_USER, 'id', 'users')
export const updateSingleUserId = () => `updateSingleUserId`
export const updateSingleUser = (userId, credentials, user) => {
  const id = updateSingleUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
    fetch('/api/users' + userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        dispatch(receivedResponse(id))
        return dispatch(updateSingleUserSuccess(id, data))
      })
      .catch(errors => dispatch(receivedResponse(id, {errors})))
  }
}

export const DELETE_SINGLE_USER = 'DELETE_SINGLE_USER' // read
export const deleteSingleUserSuccess = createAction(DELETE_SINGLE_USER, 'id', 'users')
export const deleteSingleUserId = () => `deleteSingleUserId`
export const deleteSingleUser = (userId, credentials, user) => {
  const id = deleteSingleUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
    fetch('/api/users' + userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(receivedResponse(id))
        return dispatch(deleteSingleUserSuccess(id, data))
      })
      .catch(errors => dispatch(receivedResponse(id, {errors})))
  }
}

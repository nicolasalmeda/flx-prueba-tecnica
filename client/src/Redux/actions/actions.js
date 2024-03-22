import { get,deleteU,post,put } from "../../utils/request";

export const GET_USERS = 'GET_USERS';
export const DELETE_USER = 'DELETE_USER';
export const FILTER_BY_STATUS = 'FILTER_BY_STATUS';
export const POST_USER = 'POST_USER';
export const PUT_USER = 'PUT_USER';
export const SEARCH_USERS = 'SEARCH_USERS';


export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await get(`users`);
      dispatch({
        type: GET_USERS,
        payload: {
          users: response.data,
        }
      })
    } catch(err) {
      dispatch({
        type: GET_USERS,
        payload: err.message
      })
    }
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    try{
      await deleteU(`users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    }catch(err){
      dispatch({
        type: DELETE_USER,
        payload: err.message
      })
    }
  }
}

export const filterByStatus = (status) => {
  return {
    type: FILTER_BY_STATUS,
    payload: status
  }
}

export const postUser = (data) => {
  return async (dispatch) => {
    try{
      await post('users', data);
      dispatch({
        type: POST_USER
      })
    }catch(err){
      dispatch({
        type: POST_USER,
        payload: err.message
      })
    }
  }
}

export const putUser = (id, data) => {
  return async (dispatch) => {
    try{
      await put(`users/${id}`, data);
      dispatch({
        type: PUT_USER
      })
    }catch(err){
      dispatch({
        type: PUT_USER,
        payload: err.message
      })
    }
  }
}

export const searchUsers = (searchText) => {
  return {
    type: SEARCH_USERS,
    payload: searchText
  }
}
import {
  GET_USERS,
  DELETE_USER,
  FILTER_BY_STATUS,
  POST_USER,
  PUT_USER,
} from '../actions/actions';

const initialState = {
  users: [],
  allUsers: [],
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                allUsers: action.payload,
                error: null,
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
                error: null,
            }
        case FILTER_BY_STATUS:
          return {
            ...state,
            users: state.allUsers.filter(user => user.status === action.payload),
            error: null,
          }

        case POST_USER:
            return {
              ...state,
            }

        case PUT_USER:
            return {
              ...state,
            }

        default:
            return state
    }
}

export default reducer;
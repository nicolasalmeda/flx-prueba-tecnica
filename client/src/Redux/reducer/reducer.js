import {
  GET_USERS,
  DELETE_USER,
  FILTER_BY_STATUS,
  POST_USER,
  PUT_USER,
  SEARCH_USERS,
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
                users: action.payload.users,
                allUsers: action.payload.users,
                error: null,
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
                error: null,
            }
        case FILTER_BY_STATUS:
          if (action.payload === 'all' || action.payload === undefined) {
            return {
              ...state,
              users: state.allUsers,
              error: null,
            }
          } else {
            return {
              ...state,
              users: state.allUsers.filter(user => user.status === action.payload),
              error: null,
            }
          }

        case POST_USER:
            return {
              ...state,
            }

        case PUT_USER:
            return {
              ...state,
            }

        case SEARCH_USERS:
          const searchText = action.payload.toLowerCase();
          return {
            ...state,
            users: state.allUsers.filter(user => {
              const userString = `${user.name} ${user.lastname}`.toLowerCase();
              return userString.includes(searchText);
            }),
            error: null,
          }   

        default:
            return state
    }
}

export default reducer;
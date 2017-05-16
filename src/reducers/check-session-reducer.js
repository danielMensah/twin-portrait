import ActionTypes from '../constants/action-types'

const initialState = {
  state: 0
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.CHECK_SESSION:
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
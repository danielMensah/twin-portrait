import ActionTypes from '../constants/action-types'

const initialState = {
  state: 0
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.CHECK_SESSION:
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, ...action.payload };
    case ActionTypes.LOGIN:
      return { ...state, ...action.session };

    default:
      return state;
  }
}
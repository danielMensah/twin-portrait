import ActionTypes from '../constants/action-types'

const initialState = {
  u_auth: "",
  p_auth: "",
  u_token: ""
};

export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
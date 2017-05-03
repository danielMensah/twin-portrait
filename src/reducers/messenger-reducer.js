import ActionTypes from '../constants/action-types'

const initialState = {
  status: "",
  contacts: []
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.CHAT.FETCH_MESSENGER_INFO:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
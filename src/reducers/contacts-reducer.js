import ActionTypes from '../constants/action-types'

const initialState = {
  contacts: []
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.CHAT.FETCH_CONTACTS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
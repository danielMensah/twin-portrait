import ActionTypes from '../constants/action-types'

const initialState = {
  notificationCount: null,
  notifications: []
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_NOTIFICATION:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
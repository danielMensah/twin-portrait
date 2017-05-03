import ActionTypes from '../constants/action-types'

const initialState = {
  activities: []
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.ACTIVITIES.FETCH_ACTIVITIES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
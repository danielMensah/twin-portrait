import ActionTypes from '../constants/action-types'

const initialState = {
  widgets : []
};


export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_WIDGETS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
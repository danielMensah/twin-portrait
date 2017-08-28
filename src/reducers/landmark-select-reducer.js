import ActionTypes from '../constants/action-types'

const initialState = [];

export default function(state = initialState, action = {}) {
  switch(action.type) {
    case ActionTypes.SELECT_LANDMARK:
      return { ...state, ...action.payload };

    case ActionTypes.RESET_SELECT:
      return [];

    default:
      return state;
  }
}
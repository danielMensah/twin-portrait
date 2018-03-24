import ActionTypes from '../constants/action-types'

const initialState = {};

export default function(state = initialState, action = {}) {
  switch(action.type) {

    case ActionTypes.USER.SEARCH_DOPPELGANGER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
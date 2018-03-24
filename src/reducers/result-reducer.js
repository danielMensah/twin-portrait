import ActionTypes from '../constants/action-types'

const initialState = {id: null, url: null};

export default function(state = initialState, action = {}) {
  switch(action.type) {

    case ActionTypes.RESULT.PORTRAIT_ONCLICK:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
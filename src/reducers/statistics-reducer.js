import ActionTypes from '../constants/action-types'

const initialState = {
  completedLandmarks: [],
  completedLandmarksCount: null,
  registeredUsers: [],
  registeredUsersCount: null
};

export default function(state = initialState, action = {}) {
  switch(action.type) {

    case ActionTypes.STATISTICS.FETCH_STATS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
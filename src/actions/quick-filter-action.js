import ActionTypes from '../constants/action-types';

export function enableFilter(index) {
  return dispatch => {
    dispatch({
      type: ActionTypes.QUICK_FILTER.ENABLE_FILTER,
      payload: index
    });
  }
}

export function disableFilter(index) {
  return dispatch => {
    dispatch({
      type: ActionTypes.QUICK_FILTER.DISABLE_FILTER,
      payload: index
    });
  }
}
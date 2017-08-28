import ActionTypes from '../constants/action-types';

export function selectLandmark(landmarkObj) {

  return dispatch => {
    dispatch({
      type: ActionTypes.SELECT_LANDMARK,
      payload: landmarkObj
    });
  }
}

export function resetSelect() {

  return dispatch => {
    dispatch({
      type: ActionTypes.RESET_SELECT,
    });
  }
}
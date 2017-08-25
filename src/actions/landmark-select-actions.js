import ActionTypes from '../constants/action-types';

export function selectLandmark(landmarkObj) {

  return dispatch => {
    dispatch({
      type: ActionTypes.SELECT_LANDMARK,
      payload: landmarkObj
    });
  }
}
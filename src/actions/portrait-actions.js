import ActionTypes from '../constants/action-types';
import ApiRoutes from '../constants/api-routes';
import ajax from '../util/ajax';

export function fetchPortrait() {

  return (dispatch) => {
    let request = ajax(ApiRoutes.PORTRAIT, 'GET');

    request.then((response) => {
      dispatch({
        type: ActionTypes.PORTRAIT.FETCH_PORTRAIT,
        payload: response
      })
    });

    return request;

  }
}

export function updatePortrait(obj) {

  return (dispatch) => {
    let request = ajax(ApiRoutes.UPDATE_PORTRAIT, 'POST', obj);

    request.then((response) => {
      dispatch({
        type: ActionTypes.PORTRAIT.UPDATE_PORTRAIT,
        payload: response
      })
    });

    return request;

  }
}
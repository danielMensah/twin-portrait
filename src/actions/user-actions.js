import ActionTypes from '../constants/action-types';
import ApiRoutes from '../constants/api-routes';
import ajax from '../util/ajax';

export function registerUser(userInfo) {

  return (dispatch) => {
    let request = ajax(ApiRoutes.REGISTER_USER, 'POST', userInfo);

    request.then((response) => {
      dispatch({
        type: ActionTypes.USER.REGISTER_USER,
        payload: response
      })
    });

    return request;

  }
}

export function searchDoppelganger(type, data) {

  return (dispatch) => {
    let request = ajax(ApiRoutes[type], 'POST', data);

    request.then((response) => {
      dispatch({
        type: ActionTypes.USER.SEARCH_DOPPELGANGER,
        payload: response
      })
    });

    return request;

  }
}
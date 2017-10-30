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
    }).catch(e => {
      throw new Error(`Exception status ${e.status}. Response => ${e.responseText}`)
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

export function setNotApplicable(portraitUrl) {

  return (dispatch) => {
    let request = ajax(ApiRoutes.SET_NOT_APPLICABLE, 'POST', portraitUrl);

    request.then((response) => {
      dispatch({
        type: ActionTypes.PORTRAIT.SET_NOT_APPLICABLE,
        payload: response
      })
    });

    return request;

  }
}

export function fetchPortraitInfo(id) {

  return (dispatch) => {
    let request = ajax(ApiRoutes.FETCH_PORTRAIT_INFO, 'POST', id, false );


    request.then((response) => {
      dispatch({
        type: ActionTypes.PORTRAIT.FETCH_PORTRAIT_INFO,
        payload: response
      })
    });

    return request;

  }

}
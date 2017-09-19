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

  let data = {
    title: "Kop van een leeuw",
    creator: "Frederik Willem Z_rcher",
    date_created: "1845 - 1894",
    physical_dimensions: "h 249mm - w 149mm",
    external_link: "http://hdl.handle.net/10934/RM0001.COLLECT.198545",
    external_link_text: "See more details about this work on the Rijksmuseum Website"
  };

  return (dispatch) => {
    // let request = ajax(ApiRoutes.FETCH_PORTRAIT_INFO, 'POST', id );

    dispatch({
      type: ActionTypes.PORTRAIT.FETCH_PORTRAIT_INFO,
      payload: data
    })

    // request.then((response) => {
    //   dispatch({
    //     type: ActionTypes.PORTRAIT.FETCH_PORTRAIT_INFO,
    //     payload: data
    //   })
    // });

    // return request;

  }

}
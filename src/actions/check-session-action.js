import ajax from '../util/ajax';
import ActionTypes from '../constants/action-types';
import ApiRoutes from '../constants/api-routes';

export function checkSessionState(token) {

  return (dispatch) => {
    var request = ajax(ApiRoutes.CHECK_SESSION, 'POST', { u_token: token });

    request
      .then((response) => {
        dispatch ({
          type: ActionTypes.CHECK_SESSION,
          payload: response
        });

      });

    return request;
  };
}
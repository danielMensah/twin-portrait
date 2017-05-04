import ajax from '../util/ajax';
import ActionTypes from '../constants/action-types';
import ApiRoutes from '../constants/api-routes';

export function loginAction(username, password) {
  const log_info = { username, password };

  return (dispatch) => {
    var request = ajax(ApiRoutes.LOGIN, 'POST', log_info);

    dispatch({
      type: ActionTypes.LOGIN,
      payload: {username: username, password: password}
    });

    request
      .then((response) => dispatch ({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: response
      }));

    return request;
  };
}
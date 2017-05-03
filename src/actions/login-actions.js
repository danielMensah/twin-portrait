import ajax from '../util/ajax';
import ActionTypes from '../constants/action-types';
import ApiRoutes from '../constants/api-routes';

export function loginAction(username, password) {
  const log_info = { username, password };

  return (dispatch) => {
    var request = ajax(ApiRoutes.FETCH_USER, 'POST', log_info);

    dispatch({
      type: ActionTypes.FETCH_USER,
      payload: {username: username, password: password}
    });

    request
      .then((response) => dispatch ({
        type: ActionTypes.FETCH_USER_SUCCESS,
        payload: response
      }));

    return request;
  };
}
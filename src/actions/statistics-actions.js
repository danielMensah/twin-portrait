import ActionTypes from '../constants/action-types';
import ApiRoutes from '../constants/api-routes';
import ajax from '../util/ajax';

export function fetchStatistics() {

  return (dispatch) => {
    let request = ajax(ApiRoutes.STATISTICS, 'GET');

    request.then((response) => {
      dispatch({
        type: ActionTypes.STATISTICS.FETCH_STATS,
        payload: response
      })
    });

    return request;

  }
}
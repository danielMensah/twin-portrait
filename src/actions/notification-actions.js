import ActionTypes from '../constants/action-types';

export function fetchNotification() {

  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_NOTIFICATION,
      payload: {
        notificationCount: 0,
        notifications: [
          {
            type: 'add-module',
            module: 'Programming II',
            moduleCode: 'P100'
          },
          {
            type: 'edit-module',
            module: 'Database',
            moduleCode: 'DB100'
          }
        ]
      }
    });
  }
}
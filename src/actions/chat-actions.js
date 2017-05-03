import ActionTypes from '../constants/action-types'

const testJson = {
  status: "busy",
  contacts : [
    {
      user: "Peter Parker",
      module: "Programming II",
      status: 'online'
    },
    {
      user: "Tony Stark",
      module: "Database",
      status: 'offline'
    },
    {
      user: "Clark Kent",
      module: "Networking",
      status: 'busy'
    }
  ]
};

export function fetchMessengerInfo() {

  return dispatch => {
    dispatch({
      type: ActionTypes.CHAT.FETCH_MESSENGER_INFO,
      payload: testJson
    });
  }
}
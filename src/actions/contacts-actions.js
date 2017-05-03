import ActionTypes from '../constants/action-types'

const testJson = {
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

export function fetchContacts() {

  return dispatch => {
    dispatch({
      type: ActionTypes.CHAT.FETCH_CONTACTS,
      payload: testJson
    });
  }
}
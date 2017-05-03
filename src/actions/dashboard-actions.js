import ActionTypes from '../constants/action-types'

const testJson = {
  widgets : [
    {
      type: "calendar",
      title: "Calendar"
    },
    {
      type: "studentInformation",
      title: "Student Information"
    }
  ]
};

export function fetchWidgets() {

  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_WIDGETS,
      payload: testJson
    });
  }
}
import ActionTypes from '../constants/action-types';

export function resultInfo(id, url) {
  const payload = {id, url};

  return (dispatch) => {

    dispatch({
      type: ActionTypes.RESULT.PORTRAIT_ONCLICK,
      payload
    });

  }
}
// import ajax from '../util/ajax';
// import ActionTypes from '../constants/action-types';
// import ApiRoutes from '../constants/api-routes';
// import Constants from '../constants/general-constants';
// import LocalStorage from '../util/local-storage';
//
// function cacheToken(token) {
//   if (token) {
//     LocalStorage.setItem(Constants.TOKEN_KEY, token);
//   }
// }
//
// function removeCachedToken() {
//   LocalStorage.removeItem(Constants.TOKEN_KEY);
// }
//
// export function loginAction(username, password) {
//   const credential = { username, password };
//
//   return (dispatch) => {
//     let request = ajax(ApiRoutes.ADMIN_LOGIN, 'POST', credential);
//
//     request
//       .then((response) => {
//         dispatch ({
//           type: ActionTypes.ADMIN_LOGIN_SUCCESS,
//           payload: response,
//           session: {state: response.u_token ? 1 : 0}
//         });
//
//         cacheToken(response.u_token);
//
//       });
//
//     return request;
//   };
// }
//
// export function logoutAction(token) {
//   return (dispatch) => {
//     let request = ajax(ApiRoutes.ADMIN_LOGOUT, 'POST', { u_token: token });
//
//     request
//       .then((response) => dispatch ({
//         type: ActionTypes.ADMIN_LOGOUT_SUCCESS,
//         payload: { state: 0 }
//       }));
//
//     removeCachedToken();
//
//     return request;
//   };
// }
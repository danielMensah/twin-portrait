import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import login from './login-reducer'
import quickFilter from './quick-filter-reducer'
import notification from './notification-reducer'
import dashboardWidgets from './dashboard-reducer'
import activities from './activity-reducer'
import contacts from './contacts-reducer'
import messenger from './messenger-reducer';
import checkSession from './check-session-reducer';

export default combineReducers({
  routing,
  login,
  quickFilter,
  notification,
  dashboardWidgets,
  activities,
  contacts,
  messenger,
  checkSession
})

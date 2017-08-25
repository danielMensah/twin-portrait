import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import landmarkSelect from './landmark-select-reducer'
import portrait from './portrait-reducer'

export default combineReducers({
  routing,
  landmarkSelect,
  portrait
})

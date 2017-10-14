import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import LandingPage from './components/landing-page'
import configure from './store'

const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LandingPage}/>
      <Route path="/match-portrait" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)

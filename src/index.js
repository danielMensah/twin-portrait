import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App/index'
// import LandingPage from './components/landing-page'
import AdminPanelLogin from './components/admin/admin-panel-login'
import AdminPanel from './components/admin/admin-panel'
import configure from './store'

const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AdminPanel}/>
      <Route path="/match-portrait" component={App}/>
      <Route path="/admin-login" component={AdminPanelLogin}/>
      {/*<Route path="/panel" component={AdminPanel}/>*/}
    </Router>
  </Provider>,
  document.getElementById('root')
);

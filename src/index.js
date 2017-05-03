import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import configure from './store'
import Dashboard from './components/v1/dashboard/dashboard';
import Module from './components/v1/module-page/module';
import Modules from './components/v1/module-page/module-list';
import Login from './components/v1/login/login';
import HelpCenter from './components/v1/help-center/help-center';
import Gradebook from './components/v1/gradebook/gradebook';

const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Router path="/dashboard" component={Dashboard}/>
        <Router path="/modules" component={Modules}/>
        <Router path="/modules/:module" component={Module}/>
        <Router path="/help_center" component={HelpCenter}/>
        <Router path="/gradebook" component={Gradebook}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

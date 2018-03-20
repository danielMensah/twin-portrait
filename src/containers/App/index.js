import React, { Component } from 'react';
import MatchPortrait from '../../components';
import styles from './app.css';
import { MuiThemeProvider } from 'material-ui';

class App extends Component {

  render() {
    return (
      <div id="app-container" className={styles.appContainer}>
        <MuiThemeProvider>
          <MatchPortrait/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default (App);

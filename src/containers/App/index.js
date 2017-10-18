import React, { Component } from 'react';
import MatchPortrait from '../../components';
import styles from './app.css';

class App extends Component {

  render() {
    return (
      <div id="app-container" className={styles.appContainer}>
        <MatchPortrait/>
      </div>
    )
  }
}

export default (App);

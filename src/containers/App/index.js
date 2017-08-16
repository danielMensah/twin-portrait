import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './app.css';
import Image from 'react-bootstrap/lib/Image';
import avatar from '../../images/test.jpg'
import LandmarksField from '../../landmark/landmarks-field';

class App extends Component {
  render() {
    return (
      <div id="app-container" className={styles.appContainer}>
        <div className={styles.container}>
          <div className={styles.portraits}>
            <Image src={avatar}/>
          </div>
          <div className={styles.landmarks}>
            <LandmarksField/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(App);

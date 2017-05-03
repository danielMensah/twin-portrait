import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import styles from './settings.css';

class Settings extends Component {

  render() {
    return (
      <Panel className={styles.settings} bsStyle="info">
        <Content />
      </Panel>
    )
  }
}

export default (Settings);
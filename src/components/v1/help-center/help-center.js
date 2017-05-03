import React, { Component } from 'react';
import styles from './help-center.css';

class HelpCenter extends Component {

  render() {

    return (
      <div className={styles.helpCenterContainer}>
        <div className={styles.content}>
          <div className={styles.title}>Help Center</div>
          <div className={styles.subTitle}>Use our Help Center to quickly find answer</div>
        </div>
      </div>
    )
  }
}

export default (HelpCenter);
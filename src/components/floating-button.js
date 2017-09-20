import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './floating-button.css';
import FontAwesome from 'react-fontawesome';

class Fab extends Component {

  render() {
    const { icon, size } = this.props;

    return (
      <div className={styles.fab}>
        <FontAwesome className={styles.icon} name={icon} size={size} />
      </div>
    )
  }
}

export default connect()(Fab);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './status.css';

class Status extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };

  render() {
    const { className, status} = this.props;
    const statusClassName = `${styles.status} ${styles[status]} ${className}`;

    return (
      <div className={statusClassName}/>
    )
  }
}

export default (Status);
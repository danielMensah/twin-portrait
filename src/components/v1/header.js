import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './header.css';
import { Panel } from 'react-bootstrap/lib';

class Content extends Component {

  static propTypes = {
    pageTitle: PropTypes.string,
    subTitle: PropTypes.string
  };

  render() {
    const { pageTitle, subTitle } = this.props;

    return (
        <Panel className={styles.panel}>
          <div className={styles.dashboard}>
            <div className={styles.pageTitle}>{pageTitle}</div>
            <div className={styles.subTitle}>{subTitle}</div>
          </div>
        </Panel>
    )
  }
}

export default (Content);
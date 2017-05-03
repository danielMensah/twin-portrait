import React, { Component } from 'react';
import styles from './module-list-item.css';
import { Panel } from 'react-bootstrap/lib';
import { Link } from 'react-router';
import { ROUTE_MODULE } from '../../../constants/Routes';

class ModuleList extends Component {

  render() {

    return (
      <Link to={ROUTE_MODULE('Programming')}>
        <Panel className={styles.panel}>
          <span className={styles.title}>
            <h4>Programming 2</h4>
            <span>Module code: 400</span>
          </span>
          <span className={styles.tail}>
            <span className={styles.activity}>
              <span>Last activity</span>
              <span>4 weeks ago</span>
            </span>
            <span className={styles.gradePercentage}>
              80%
            </span>
          </span>
        </Panel>
      </Link>
    )
  }
}

export default (ModuleList);
import React, { Component } from 'react';
import styles from './small-screen-menu-dialog.css';
import { Badge } from 'react-bootstrap/lib';
import { Link } from 'react-router';

class SmallScreenMenuDialog extends Component {

  render() {

    return (
      <div>
        <div className={styles.main}>
          <div className={styles.item}>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className={styles.item}>
            <Link to="/modules">Modules</Link>
          </div>
          <div className={styles.item}>
            <Link to="/gradebook">Gradebook</Link>
          </div>
          <div className={styles.item}>
            <Link to="/storage">Storage</Link>
          </div>
          <div className={styles.item}>
            <Link to="/notification">Notifications</Link>
            <Badge className={styles.alertBadge}>42</Badge>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.item}>
            <Link to="/help_center">Help Center</Link>
          </div>
          <div className={styles.item}>
            <Link to="/settings">Settings</Link>
          </div>
          <div className={styles.item}>
            <Link to="/">Log out</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default (SmallScreenMenuDialog);
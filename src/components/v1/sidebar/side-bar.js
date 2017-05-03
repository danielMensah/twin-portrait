import React, { Component } from 'react';
import styles from './side-bar.css';
import Navbar from 'react-bootstrap/lib/Navbar';
import SidebarItems from './side-bar-items';
import UserImage from './user-image';
import FontAwesome from 'react-fontawesome';

class SideBar extends Component {

  render() {

    return (
      <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
        <Navbar fluid className={styles.sidebar} inverse >
          <Navbar.Header className={styles.navbarHeader}>
            <Navbar.Brand>
              <UserImage />
            </Navbar.Brand>
            <span className={styles.menuTitle}>Main Navigation</span>
          </Navbar.Header>
          <SidebarItems />
        </Navbar>
        <FontAwesome className={styles.angleRight} size="2x" name="angle-right" />
      </div>
    )
  }
}


export default (SideBar);
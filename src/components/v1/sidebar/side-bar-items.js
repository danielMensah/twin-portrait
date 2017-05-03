import React, { Component } from 'react';
import { ROUTE_MODULE } from '../../../constants/Routes';
import { Link } from 'react-router';
import styles from './side-bar-items.css';
import { Navbar, Nav, NavItem, Collapse } from 'react-bootstrap/lib';
import FontAwesome from 'react-fontawesome';

class SideBarItems extends Component {

  constructor(prop) {
    super(prop);
    this.state = { open: false };
  }

  render() {

    return (
      <Navbar.Collapse>
        <Nav>
          <NavItem className={styles.navItem} eventKey={1}>
            <FontAwesome className={styles.navItemIcon} name='globe' size="lg"/>
            <Link className={styles.navItemIconText} to='/dashboard'>Dashboard</Link>
          </NavItem>
          <NavItem onClick={this.showModules} className={`${styles.navItem} ${styles.itemModule}`}>
            <FontAwesome className={styles.navItemIcon} name='clone' size="lg"/>
            <span className={styles.navItemIconText}>Modules</span>
            <Collapse in={this.state.open}>
              <div className={styles.collapse}>
                <div className={styles.module}>
                  <Link to={ROUTE_MODULE('ProgrammingIII')}>Programming III</Link>
                </div>
                <div className={styles.module}>
                  <Link to={ROUTE_MODULE('Database')}>Database</Link>
                </div>
                <div className={styles.module}>
                  <Link to={ROUTE_MODULE('Networking')}>Networking</Link>
                </div>
                <div className={styles.module}>
                  <Link to={ROUTE_MODULE('SystemEnvironment')}>System Environment</Link>
                </div>
              </div>
            </Collapse>
          </NavItem>
          <NavItem className={styles.navItem} eventKey={3}>
            <FontAwesome className={styles.navItemIcon} name='bookmark-o' size="lg"/>
            <Link className={styles.navItemIconText} to='/gradebook'>Gradebook</Link>
          </NavItem>
          <NavItem className={styles.navItem} eventKey={4}>
            <FontAwesome className={styles.navItemIcon} name='envelope-o' size="lg"/>
            <Link className={styles.navItemIconText} to='/messages'>Messages</Link>
          </NavItem>
          <NavItem className={styles.navItem} eventKey={5}>
            <FontAwesome className={styles.navItemIcon} name='hdd-o' size="lg"/>
            <Link className={styles.navItemIconText} to='/storage'>Storage</Link>
          </NavItem>
          <NavItem className={styles.menuTitle} eventKey={6}>
            <span>More</span>
          </NavItem>
          <NavItem className={styles.navItem} eventKey={7}>
            <FontAwesome className={styles.navItemIcon} name='question-circle' size="lg"/>
            <Link className={styles.navItemIconText} to='/help_center'>Help Centre</Link>
          </NavItem>
          <NavItem className={styles.navItem} eventKey={8}>
            <FontAwesome className={styles.navItemIcon} name='cogs' size="lg"/>
            <Link className={styles.navItemIconText} to='/settings'>Settings</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    )
  }

  showModules = () => {
    this.setState({ open: !this.state.open })
  }
}

export default (SideBarItems);
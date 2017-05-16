import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, Button, OverlayTrigger, Popover } from 'react-bootstrap/lib';
import logo from '../../../images/Olep_white_.png';
import styles from './nav-bar.css';
import FontAwesome from 'react-fontawesome';
import Notification from './notification';
import SmallScreenMenuDialog from '../small-screen-menu-dialog';
import { blue_celestial } from '../../../util/color-scheme';
import { logoutAction } from '../../../actions/login-actions';

class NavBar extends Component {

  componentDidMount() {
    document.getElementById('olep_navBar').style.backgroundColor = `${blue_celestial()}`;
  }

  render() {
    const notificationProps = {
      stylesNavItem: styles.navItem,
      stylesAlertBadge: styles.alertBadge,
      stylesNavItemIcon: styles.navItemIcon,
      eventKey: 2
    };

    const popoverBottom = (
      <Popover ref={(popover) => this.popover = popover} className={styles.popover} id="popover-positioned-bottom" title="Menu">
        <SmallScreenMenuDialog />
      </Popover>
    );

    return (
    <Navbar id="olep_navBar" inverse collapseOnSelect className={styles.navbar}>
      <Navbar.Header className={styles.header}>
        <Navbar.Brand className={styles.brand}>
          <img alt="" src={logo} />
        </Navbar.Brand>
        <OverlayTrigger onClick={this.adjustPopoverWidthPosition.bind(this)} trigger="click" placement="bottom" overlay={popoverBottom}>
          <Button className={styles.menuButton}>
            <FontAwesome name='bars' size="lg"/>
          </Button>
        </OverlayTrigger>
      </Navbar.Header>
      <Nav className={styles.collapse} pullRight>
        <Notification {...notificationProps} />
        <NavItem className={styles.navItem} eventKey={3}>
          <FontAwesome className={styles.navItemIcon} name='lock'/>
        </NavItem>
        <NavItem onClick={this.signOut} className={styles.navItem} eventKey={4}>
          <FontAwesome className={styles.navItemIcon} name='sign-out'/>
        </NavItem>
      </Nav>
    </Navbar>
    )
  }

  signOut = () => {
    this.props.logoutAction(this.props.token).then(() => {
      browserHistory.push('/');
    })
  };

  adjustPopoverWidthPosition = () => {
    setTimeout(() => {
      const popover = ReactDOM.findDOMNode(this.popover);
      const width = window.innerWidth - 232;
      popover.style.left = `${width}px`
    }, 100)
  }
}

const mapStateProps = ({login}) => ({
  token: login.u_token
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ logoutAction }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(NavBar);
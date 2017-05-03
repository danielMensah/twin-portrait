import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Badge, NavItem, OverlayTrigger, Popover, ButtonGroup, Button } from 'react-bootstrap/lib';
import FontAwesome from 'react-fontawesome';
import PopoverContent from '../extras/popover-content';
import styles from './notification.css';

class Notification extends Component {
  
  componentWillMount() {
    this.props.fetchNotification()
  }

  render() {
    const { stylesNavItem, stylesAlertBadge, stylesNavItemIcon,
      eventKey, notification } = this.props;

    const popoverBottom = (
      <Popover className={styles.popover} id="popover-positioned-bottom" title="Notifications">
        <PopoverContent content />
        <PopoverContent />
        <PopoverContent />
        <PopoverContent />
        <ButtonGroup className={styles.btnGroup}>
          <Button className={styles.btnMarkAll}>Mark all read</Button>
          <Button className={styles.btnViewAll}>View all</Button>
        </ButtonGroup>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
        <NavItem className={stylesNavItem} eventKey={eventKey}>
          { notification.notificationCount ?
            <Badge className={stylesAlertBadge}>{notification.notificationCount}</Badge>
            : null }
          <FontAwesome className={stylesNavItemIcon} name='bell-o'/>
        </NavItem>
      </OverlayTrigger>
    )
  }
}

const mapStateToProps = ({ notification }) => ({ notification });
import { fetchNotification } from '../../../actions/notification-actions'
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

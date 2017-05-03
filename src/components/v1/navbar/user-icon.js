import React, { Component } from 'react';
import Image from 'react-bootstrap/lib/Image';
import avatar from '../../../images/avatar.jpg';
import styles from './user-icon.css';

class NavBar extends Component {

  render() {

    return (
      <div className={styles.userIcon}>
        <Image className={styles.avatar} src={avatar} rounded />
      </div>
    )
  }
}

export default (NavBar);
import React, { Component } from 'react';
import Image from 'react-bootstrap/lib/Image';
import avatar from '../../../images/avatar.jpg';
import styles from './user-image.css';

class UserImage extends Component {

  render() {

    return (
      <div className={styles.userContainer}>
        <Image className={styles.avatar} src={avatar} rounded />
        <span className={styles.userName}>Hello, Daniel</span>
        <span className={styles.userCourse}>SEC, Software Engineering</span>
      </div>
    )
  }
}

export default (UserImage);
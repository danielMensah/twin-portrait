import React, { Component } from 'react';
import { Image } from 'react-bootstrap/lib';
import avatar from '../../../images/avatar.jpg';
import styles from './contact-image.css';

class ContactImage extends Component {

  render() {

    return (
      <Image className={styles.avatar} src={avatar} rounded />
    )
  }
}

export default (ContactImage);
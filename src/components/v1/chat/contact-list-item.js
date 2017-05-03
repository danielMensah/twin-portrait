import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contact-list-item.css';
import ContactImage from './contact-image'
import Status from './status';

class ContactListItem extends Component {

  static propTypes = {
    user: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  };

  render() {
    const { user, module, status} = this.props;

    return (
      <div className={styles.contactListItem}>
        <ContactImage />
        <div className={styles.main}>
          <div className={styles.user}>{user}</div>
          <div className={styles.module}>{module}</div>
        </div>
        <Status status={status} className={styles.status} />
      </div>
    )
  }
}

export default (ContactListItem);
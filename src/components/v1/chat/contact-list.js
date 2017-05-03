import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import styles from './contact-list.css';
import ContactListItem from './contact-list-item'
import { uniqueId } from 'lodash';

class ContactList extends Component {

  static propTypes = {
    contacts: PropTypes.array,
  };

  render() {
    const { contacts } = this.props;

    return (
      <div className={styles.contactList}>
        {contacts.map((contact) => {
          return <ContactListItem {...contact} key={uniqueId('test')}/>
        })}
      </div>
    )
  }
}

export default connect()(ContactList);
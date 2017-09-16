import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './registration-modal.css';
import {Modal} from 'react-bootstrap/lib';
import Body from './help-body/body';

class HelpModal extends Component {

  render() {
    const { show, onHide, landmark } = this.props;

    return (
      <Modal bsSize="large" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">How to choose {landmark} shape</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Body landmark={landmark}/>
        </Modal.Body>
      </Modal>
    )
  }
}

export default connect()(HelpModal);

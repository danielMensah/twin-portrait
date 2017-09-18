import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './portrait-info-modal.css';
import { Modal, Image } from 'react-bootstrap/lib';
import { fetchPortraitInfo } from '../../../actions/portrait-actions';

class PortraitInfoModal extends Component {

  componentWillMount() {
    const { portraitId, fetchPortraitInfo } = this.props;
    fetchPortraitInfo(portraitId);
  }

  render() {
    const { show, onHide, portraitUrl, portraitId } = this.props;

    return (
      <Modal bsSize="large" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Portrait Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Image src={portraitUrl}/>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortraitInfo }, dispatch);

export default connect(null, mapDispatchToProps)(PortraitInfoModal);

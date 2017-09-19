import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './portrait-info-modal.css';
import { Modal, Image, ControlLabel } from 'react-bootstrap/lib';
import { fetchPortraitInfo } from '../../../actions/portrait-actions';

class PortraitInfoModal extends Component {

  componentWillMount() {
    const { portraitId, fetchPortraitInfo } = this.props;
    fetchPortraitInfo(portraitId);
  }

  render() {
    const { show, onHide, portraitInfo, portraitUrl } = this.props;
    const { title, creator, date_created, physical_dimensions, external_link, external_link_text } = portraitInfo;

    return (
      <Modal bsSize="large" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.header} id="contained-modal-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Image src={portraitUrl}/>
          <div className={styles.details}>
            <div className={styles.title}>
              <ControlLabel>Title: </ControlLabel>
              <span> {title}</span>
            </div>
            <div className={styles.creator}>
              <ControlLabel>Creator: </ControlLabel>
              <span> {creator}</span>
            </div>
            <div className={styles.date}>
              <ControlLabel>Date Created: </ControlLabel>
              <span> {date_created}</span>
            </div>
            <div className={styles.dimensions}>
              <ControlLabel>Physical Dimensions: </ControlLabel>
              <span> {physical_dimensions}</span>
            </div>
            <div className={styles.externalLink}>
              <ControlLabel>Link: </ControlLabel>
              <a target="blank" href={external_link}> {external_link_text}</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateProps = ({portrait, portraitInfo}) => ({
  portraitInfo: portraitInfo,
  portraitUrl: portrait.portraitURL
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortraitInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(PortraitInfoModal);

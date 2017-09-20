import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './portrait-info-modal.css';
import { Modal, Image, ControlLabel } from 'react-bootstrap/lib';
import { fetchPortraitInfo } from '../../../actions/portrait-actions';
import loadingImg from '../../../images/loading2.gif';
import Fab from '../../floating-button';

class PortraitInfoModal extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      loading: false,
    }
  }

  startLoading = () => {
    this.setState({ loading: true})
  };

  stopLoading = () => {
    this.setState({ loading: false})
  };

  componentWillMount() {
    const { portraitId, fetchPortraitInfo } = this.props;

    this.startLoading();
    fetchPortraitInfo({ id: portraitId }).then(() => this.stopLoading());
  }

  render() {
    const { show, onHide, portraitInfo, portraitUrl, portraitId } = this.props;
    const { title, creator, date_created, physical_dimensions, external_link, external_link_text } = portraitInfo;
    const { loading } = this.state;

    return (
      <Modal bsSize="large" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.header} id="contained-modal-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          { loading ? <Image className={styles.loading} src={loadingImg}/> :
            <div className={styles.detailsContainer}>
              <div>
                <div className={styles.more}>
                  <a href={portraitUrl} target="blank"><Fab size="2x" icon="external-link"/></a>
                </div>
                <Image src={portraitUrl} responsive/>
              </div>
              <div className={styles.details}>
                <div className={styles.subDetails}>
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
                    <a target="blank" href={external_link === "Unknown" ? `https://www.google.com/culturalinstitute/beta/asset/${portraitId}` : external_link}>
                      {external_link_text === "Unknown" ? 'Click here for more information' : external_link_text}</a>
                  </div>
                </div>
              </div>
            </div>
          }

        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateProps = ({portrait, portraitInfo}) => ({
  portraitInfo: portraitInfo,
  portraitUrl: portrait.portraitURL,
  portraitId: portrait.id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortraitInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(PortraitInfoModal);

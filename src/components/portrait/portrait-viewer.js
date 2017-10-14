import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './styles.css';
import Fab from '../floating-button';
import { Button } from 'react-bootstrap/lib';
import ReactImageMagnify from 'react-image-magnify';
import FontAwesome from 'react-fontawesome';

class PortraitViewer extends Component {

  static propTypes = {
    portraitUrl: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    NUM_PORTRAITS: PropTypes.number.isRequired,
    updatePortrait: PropTypes.func.isRequired,
    openInfoModal: PropTypes.func.isRequired,
    notApplicable: PropTypes.func.isRequired
  };

  render() {
    const { portraitUrl, currentPage, NUM_PORTRAITS,updatePortrait, openInfoModal, notApplicable, page } = this.props;

    const imagePortrait = <ReactImageMagnify {...{
      smallImage: {
        alt: portraitUrl,
        isFluidWidth: true,
        src: portraitUrl,
        sizes: '(min-width: 480px) 30vw, 80vw'
      },
      largeImage: {
        alt: '',
        src: portraitUrl,
        width: 1400,
        height: 1800
      }
    }} />;

    const submitNextButton = page > NUM_PORTRAITS ?
      <Button onClick={updatePortrait} className={styles.submit} bsSize="large" bsStyle="success">
        <FontAwesome className={styles.nextIcon} name="paper-plane" size="2x" />
      </Button> :
      <Button id="next-portrait" onClick={updatePortrait} className={styles.next} bsSize="large" bsStyle="primary">
        <FontAwesome className={styles.nextIcon} name="arrow-right" size="2x" />
      </Button>;

    return (
      <div id="portraits" className={styles.portraits}>
        <span className={styles.helper}>
          <span id="page-track" className={styles.pageTrack}>{currentPage}/{NUM_PORTRAITS + 2}</span>
          <span id="image-portrait">
            {imagePortrait}
          </span>
          <div id="portrait-info" onClick={openInfoModal} className={styles.more}>
            <Fab size="2x" icon="info-circle"/>
          </div>
          <div className={styles.groupBtn}>
            <Button id="not-applicable" className={styles.notApplicable} bsSize="large" bsStyle="danger"
                    onClick={notApplicable}>
              <FontAwesome className={styles.notAppIcon} name="times" size="2x"/>
            </Button>
            {submitNextButton}
          </div>
        </span>
      </div>
    )
  }
}

export default connect()(PortraitViewer);

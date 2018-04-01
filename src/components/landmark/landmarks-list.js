import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './landmarks-list.css';
import DroppableField from './droppable-field';
import { EYEBROWS, EYES, NOSES } from '../../images';
import HelpModal from '../modals/help-modal';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';

class LandmarksList extends Component {

  constructor(prop) {
    super(prop);
    this.state = { showHelpModal: false, landmarkName: '', guide: false }
  }

  render() {
    const { showHelpModal, guide } = this.state;
    const arrayOfLandmarks = [
      {
        text: 'Order Eyebrows Shape',
        name: 'eyebrows',
        landmarks: EYEBROWS
      },
      {
        text: 'Order Eyes Shape',
        name: 'eye',
        landmarks: EYES
      },
      {
        text: 'Order Nose Shape',
        name: 'nose',
        landmarks: NOSES
      }
    ];

    const guideStyle = {
      position: "fixed",
      backgroundColor: "rgba(0, 0, 0, 0.67)",
      padding: "15px",
      bottom: "30px",
      color: "white",
      borderRadius: "17px",
      visibility: guide ? 'visible' : 'hidden'
    };

    return (
      <div id="landmark" className={styles.container}>
        {arrayOfLandmarks.map((landmark) => {
          return (
            <div onMouseEnter={() => this.setState({ guide: true})} onMouseLeave={() => this.setState({ guide: false})} className={styles.landmarkSection} key={landmark.text}>
              <h2 className={styles.landmarkHeader}>
                <span>{landmark.text}</span>
              </h2>
              <div className={styles.droppableField}>
                <DroppableField landmarks={landmark.landmarks} landmarkName={landmark.name}/>
                <Button id="landmark-help" onClick={() => this.openHelpModal(landmark.name)} className={styles.openHelpModal} bsSize="large" bsStyle="primary">
                  <FontAwesome name="question" size="2x" />
                </Button>
              </div>
              { showHelpModal ? <HelpModal landmark={this.state.landmarkName} onHide={this.closeHelpModal} show={showHelpModal}/> : null }
            </div>
          )
        })}
        <div style={guideStyle}>Drag and drop the items to order the landmark types</div>
      </div>
    )
  }

  openHelpModal = (name) => {
    this.setState({ showHelpModal: true, landmarkName: name })
  };

  closeHelpModal = () => {
    this.setState({ showHelpModal: false })
  }
}

export default connect()(LandmarksList);

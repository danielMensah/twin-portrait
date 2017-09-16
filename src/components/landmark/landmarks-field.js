import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './landmarks-field.css';
import FacialLandmarksGenerator from './facial-landmarks-generator';
import Landmarks from '../../constants/landmarks';

// import Image from 'react-bootstrap/lib/Image';

class LandmarksField extends Component {

  render() {

    const landmarks = [
      {
        text: 'Select Eyebrows Shape',
        className: `${styles.eyeBrows}`,
        feature: <FacialLandmarksGenerator landmark={Landmarks.eyebrows}/>
      },
      {
        text: 'Select Eyes Shape',
        className: `${styles.eyes}`,
        feature: <FacialLandmarksGenerator landmark={Landmarks.eye}/>
      },
      {
        text: 'Select Nose Shape',
        className: `${styles.noses}`,
        feature: <FacialLandmarksGenerator landmark={Landmarks.nose}/>
      }
    ];

    return (
      <div className={styles.container}>
        {landmarks.map((landmark) => {
          return (
            <div className={landmark.className} key={landmark.text}>
              <h2 className={styles.landmarkHeader}>
                <span>{landmark.text}</span>
              </h2>
              {landmark.feature}
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect()(LandmarksField);

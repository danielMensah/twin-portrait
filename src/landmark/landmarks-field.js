import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './landmarks-field.css';
import FacialLandmarksGenerator from './facial-landmarks-generator';
// import Image from 'react-bootstrap/lib/Image';

class LandmarksField extends Component {

  render() {

    const landmarks = [
      {
        text: 'Select Face Shape',
        className: `${styles.faces}`,
        feature: <FacialLandmarksGenerator landmark="face"/>
      },
      {
        text: 'Select Eyebrows Shape',
        className: `${styles.eyeBrows}`,
        feature: <FacialLandmarksGenerator landmark="eyebrows"/>
      },
      {
        text: 'Select Eyes Shape',
        className: `${styles.eyes}`,
        feature: <FacialLandmarksGenerator landmark="eyes"/>
      },
      {
        text: 'Select Nose Shape',
        className: `${styles.noses}`,
        feature: <FacialLandmarksGenerator landmark="noses"/>
      },
      {
        text: 'Select Lips Shape',
        className: `${styles.lips}`,
        feature: <FacialLandmarksGenerator landmark="lips"/>
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

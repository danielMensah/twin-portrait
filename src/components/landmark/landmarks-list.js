import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './landmarks-list.css';
import DroppableField from './droppable-field';
import { EYEBROWS, EYES, NOSES } from '../../images';

class LandmarksList extends Component {

  render() {

    const arrayOfLandmarks = [
      {
        text: 'Select Eyebrows Shape',
        name: 'eyebrows',
        landmarks: EYEBROWS
      },
      {
        text: 'Select Eyes Shape',
        name: 'eye',
        landmarks: EYES
      },
      {
        text: 'Select Nose Shape',
        name: 'nose',
        landmarks: NOSES
      }
    ];

    return (
      <div className={styles.container}>
        {arrayOfLandmarks.map((landmark) => {
          return (
            <div key={landmark.text}>
              <h2 className={styles.landmarkHeader}>
                <span>{landmark.text}</span>
              </h2>
              <DroppableField landmarks={landmark.landmarks} landmarkName={landmark.name}/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect()(LandmarksList);

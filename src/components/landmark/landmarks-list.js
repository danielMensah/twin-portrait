import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './landmarks-list.css';
import LandmarksListItem from './landmarks-list-item';

class LandmarksList extends Component {

  render() {

    const landmarks = [
      {
        text: 'Select Eyebrows Shape',
        className: `${styles.eyeBrows}`,
        name: 'eyebrows'
      },
      {
        text: 'Select Eyes Shape',
        className: `${styles.eyes}`,
        name: 'eye'
      },
      {
        text: 'Select Nose Shape',
        className: `${styles.noses}`,
        name: 'nose'
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
              <LandmarksListItem landmark={landmark.name}/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect()(LandmarksList);

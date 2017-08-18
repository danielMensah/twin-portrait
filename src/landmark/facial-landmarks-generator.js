import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './facial-landmarks-generator.css';
import Image from 'react-bootstrap/lib/Image';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap/lib';
import { FACES, EYES, EYEBROWS, LIPS, NOSES } from '../images/index';

class Faces extends Component {

  render() {
    const obj = {
      face: {
        prop: FACES,
        className: styles.face
      },
      eyes: {
        prop: EYES,
        className: styles.eyes
      },
      eyebrows: {
        prop: EYEBROWS,
        className: styles.eyebrows
      },
      lips: {
        prop: LIPS,
        className: styles.lips
      },
      noses: {
        prop: NOSES,
        className: styles.noses
      }
    };

    const { landmark } = this.props;
    const landmarkObj = obj[landmark];

    return (
      <ToggleButtonGroup type="radio" name="options" defaultValue={1} className={styles.facesContainer}>
        {landmarkObj.prop.map((face, index) => {
          index++;
          return (
            <ToggleButton value={index} className={`${styles[landmark]} ${styles.box}`} key={face.name}>
              <Image className={styles.faceImg} src={face.img}/>
              <div className={styles.faceName}>{face.name}</div>
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    )
  }
}

export default connect()(Faces);
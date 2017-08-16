import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './faces.css';
import Image from 'react-bootstrap/lib/Image';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import { FACES } from '../images/faces';

class Faces extends Component {

  render() {

    return (
      <ToggleButtonGroup type="radio" name="options" defaultValue={1} className={styles.facesContainer}>
        {FACES.map((face, index) => {
          index++;
          return (
            <ToggleButton value={index} className={styles.face} key={face.name}>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './facial-hair-gender-list.css';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib';

class FacialHairGenderList extends Component {

  static propTypes = {
    genderRef: PropTypes.any.isRequired,
    facialHairRef: PropTypes.any.isRequired,
  };

  render() {
    const { genderRef, facialHairRef } = this.props;

    return (
      <div className={styles.extraInfo}>
        <FormGroup className={styles.form} controlId="formControlsSelect">
          <div id="area-chart" className={styles.gender}>
            <ControlLabel>Select gender</ControlLabel>
            <FormControl ref={genderRef} componentClass="select" placeholder="select">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormControl>
          </div>
          <div className={styles.facialHair}>
            <ControlLabel>Select facial hair</ControlLabel>
            <FormControl ref={facialHairRef} componentClass="select" placeholder="select">
              <option value="none">None</option>
              <option value="mustache">Mustache</option>
              <option value="beard">Beard</option>
              <option value="both">Mustache and beard</option>
            </FormControl>
          </div>
        </FormGroup>
      </div>
    )
  }
}

export default connect()(FacialHairGenderList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './advance-match-options.css';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib';

class AdvanceMatchOptions extends Component {

  static propTypes = {
    feature: PropTypes.any.isRequired,
    facialHairRef: PropTypes.any.isRequired,
  };

  render() {
    const { feature, facialHairRef } = this.props;

    return (
      <div id="extra-info" className={styles.extraInfo}>
        <FormGroup className={styles.form} controlId="formControlsSelect">
          <div id="area-chart" className={styles.gender}>
            <ControlLabel>Select your strongest feature</ControlLabel>
            <FormControl ref={feature} componentClass="select" placeholder="select">
              <option value="null">None</option>
              <option value="eye">Eye</option>
              <option value="eyebrows">Eyebrows</option>
              <option value="nose">Nose</option>
            </FormControl>
          </div>
          <div className={styles.facialHair}>
            <ControlLabel>Is your facial hair very important?</ControlLabel>
            <FormControl ref={facialHairRef} componentClass="select" placeholder="select">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </FormControl>
          </div>
        </FormGroup>
      </div>
    )
  }
}

export default connect()(AdvanceMatchOptions);

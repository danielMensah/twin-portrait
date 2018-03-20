import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './body.css';
import { Image, ControlLabel } from 'react-bootstrap/lib';
import { EYEBROWS, EYES, NOSE } from './content-list';

class Body extends Component {
  static propTypes = {
    landmark: PropTypes.string.isRequired
  };

  render() {
    const { landmark } = this.props;
    const items = {
      eyebrows: EYEBROWS,
      eye: EYES,
      nose: NOSE
    };

    return (
      <div>
        {items[landmark].map((item) => {
          return (
            <div key={item.img} className={styles.block}>
              <ControlLabel>{item.label}</ControlLabel>
              <div className={styles.block2}>
                <Image className={styles[landmark]} src={item.img} rounded/>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}

export default connect()(Body);
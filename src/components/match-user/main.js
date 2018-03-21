import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';
import styles from './main.css';
import Landmarks from '../landmark/landmarks-list';
import FacialHairGenderList from '../landmark/facial-hair-gender-list';

class Main extends Component {

  // static propTypes = {
  // };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {

    return (
      <div className={styles.main}>
        <div className={styles.extraInfo}>
          <FacialHairGenderList genderRef={el => this.gender = el} facialHairRef={el => this.facialHair = el}/>
        </div>
        <div className={styles.landmarkList}>
          <Landmarks/>
        </div>
        <div className={styles.buttons}>
          <RaisedButton
            label="Basic Search"
            onClick={() => this.searchDoppelganger('basic')}
            style={styles.basic}/>
          <RaisedButton
            label="Advanced Search"
            primary={true}
            onClick={() => this.searchDoppelganger('advanced')}
            style={styles.advanced}/>
        </div>
      </div>
    )
  }

  searchDoppelganger = (type) => {
    browserHistory.push('/results')
  }

}

export default connect()(Main);

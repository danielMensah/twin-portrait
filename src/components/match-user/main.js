import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';
import styles from './main.css';
import Landmarks from '../landmark/landmarks-list';
import FacialHairGenderList from '../landmark/facial-hair-gender-list';
import SearchModel from '../modals/search-modal';
import { bindActionCreators } from 'redux';
import { searchDoppelganger } from '../../actions/user-actions';
import FacialHairManager from '../../util/managers/facial-hair-manager';
import { forEach } from 'lodash';
// import JoyrideTour from '../joyride/joyride-tour';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0, showModal: false }
  }

  render() {
    const { showModal } = this.state;

    return (
      <div id="match-main" className={styles.main}>
        <div className={styles.extraInfo}>
          <FacialHairGenderList genderRef={el => this.gender = el} facialHairRef={el => this.facialHair = el}/>
        </div>
        <div className={styles.landmarkList}>
          <Landmarks/>
        </div>
        <div className={styles.searchButtons}>
          <RaisedButton
            label="Perfect Search"
            onClick={() => this.search('BASIC_SEARCH')}/>
          <RaisedButton
            label="Advanced Search"
            primary={true}
            onClick={() => this.search('ADVANCED_SEARCH')}/>
        </div>
        <SearchModel show={showModal} onHide={this.hideModal} />
        {/*<JoyrideTour stepType="match" type="userMatch"/>*/}
      </div>
    )
  }

  search = (type) => {
    const { selectedLandmarks, searchDoppelganger } = this.props;

    const gender = ReactDOM.findDOMNode(this.gender).options[ReactDOM.findDOMNode(this.gender).selectedIndex].value;
    const facialHair = FacialHairManager(ReactDOM.findDOMNode(this.facialHair));

    let dataToSend = { gender, ...facialHair };
    dataToSend.landmarks = {};

    forEach(selectedLandmarks, (landmark) => {
      const key = Object.keys(landmark)[0];
      dataToSend.landmarks[key] = landmark[key];
    });

    this.setState({ showModal: true }, () => {
      searchDoppelganger(type, dataToSend).then(() => {
        this.hideModal();
        browserHistory.push('/results')
      })
    });
  };

  hideModal = () => {
    this.setState({ showModal: false })
  };

}

const mapStateProps = ({landmarkSelect}) => ({
  selectedLandmarks: landmarkSelect
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ searchDoppelganger }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Main);

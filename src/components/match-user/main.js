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

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0, showModal: false }
  }

  render() {
    const { showModal } = this.state;

    return (
      <div id="match-main" className={styles.main}>
        <div>
          <div className={styles.extraInfo}>
            <FacialHairGenderList genderRef={el => this.gender = el} facialHairRef={el => this.facialHair = el}/>
          </div>
          <div className={styles.landmarkList}>
            <Landmarks/>
          </div>
        </div>
        <div className={styles.searchButtons}>
          <h3 style={{fontWeight: 'lighter'}}>Find your match!</h3>
          <RaisedButton
            label="Perfect Match"
            onClick={() => this.search('BASIC_SEARCH')}/>
          <div className={styles.advanced}>
            <div style={{fontWeight: 'lighter'}}>Advanced Match</div>
            <RaisedButton
              label="Search"
              primary={true}
              style={{width: '100%'}}
              onClick={() => this.search('ADVANCED_SEARCH')}/>
          </div>
        </div>
        <SearchModel show={showModal} onHide={this.hideModal} />
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

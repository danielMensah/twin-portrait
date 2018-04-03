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
import {resultInfo } from '../../actions/result-actions';
import FacialHairManager from '../../util/managers/facial-hair-manager';
import { forEach } from 'lodash';
import Options from './advance-match-options';
import Converter from '../../util/landmark-converter';
import PortraitInfoModal from '../match-result/portrait-info-modal';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0, showModal: false, showPerfectResult: false }
  }

  render() {
    const { showModal, showPerfectResult } = this.state;

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
          <h3 style={{fontWeight: 'lighter'}}>Find your Doppelganger!</h3>
          <RaisedButton
            label="Perfect Match"
            style={{marginTop: '50px'}}
            onClick={() => this.search('BASIC_SEARCH')}/>
          <div className={styles.advanced}>
            <h4 style={{fontWeight: 'lighter'}} >Advanced match</h4>
            <Options facialHairRef={el => this.facialHairImportance = el} feature={el => this.feature = el}/>
            <RaisedButton
              label="Match"
              primary={true}
              style={{width: '100%'}}
              onClick={() => this.search('ADVANCED_SEARCH')}/>
          </div>
        </div>
        <SearchModel show={showModal} onHide={this.hideModal} />
        <PortraitInfoModal show={showPerfectResult} onHide={this.resultModal}/>
      </div>
    )
  }

  search = (type) => {
    const { selectedLandmarks } = this.props;

    const gender = ReactDOM.findDOMNode(this.gender).options[ReactDOM.findDOMNode(this.gender).selectedIndex].value;
    const facialHairImportance = ReactDOM.findDOMNode(this.facialHairImportance).options[ReactDOM.findDOMNode(this.facialHairImportance).selectedIndex].value;
    const priority = ReactDOM.findDOMNode(this.feature).options[ReactDOM.findDOMNode(this.feature).selectedIndex].value;
    const facialHair = FacialHairManager(ReactDOM.findDOMNode(this.facialHair));

    let dataToSend = { gender, ...facialHair, facialHairImportance: facialHairImportance , priority };
    dataToSend.landmarks = {};

    if (type === 'ADVANCED_SEARCH') {
      this.advancedMatch(dataToSend, selectedLandmarks);
    } else {
      this.basicMatch(dataToSend, selectedLandmarks)
    }
  };

  hideModal = () => {
    this.setState({ showModal: false })
  };

  resultModal = () => {
    this.setState({ showPerfectResult: false })
  };

  advancedMatch = (dataToSend, selectedLandmarks) => {
    forEach(selectedLandmarks, (landmark) => {
      const key = Object.keys(landmark)[0];
      dataToSend.landmarks[key] = landmark[key];
    });

    this.setState({ showModal: true }, () => {
      this.props.searchDoppelganger('ADVANCED_SEARCH', dataToSend).then(() => {
        this.hideModal();
        browserHistory.push('/results')
      }).catch(() => console.log('this is an error'))
    });
  };

  basicMatch = (dataToSend, selectedLandmarks) => {
    forEach(selectedLandmarks, (landmark) => {
      const key = Object.keys(landmark)[0];
      let arr = [];
      forEach(landmark[key], (item) => {
        arr.push(Converter(key, item));
      });
      dataToSend.landmarks[key] = arr;
    });

    this.setState({ showModal: true }, () => {
      this.props.searchDoppelganger('BASIC_SEARCH', dataToSend).then((response) => {
        this.hideModal();
        this.setState({ showPerfectResult: true });
        this.props.resultInfo(response[0].id, response[0].image_url).then(() => {
        })
      }).catch(() => console.log('this is an error'))
    });
  }

}

const mapStateProps = ({landmarkSelect}) => ({
  selectedLandmarks: landmarkSelect
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ searchDoppelganger, resultInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Main);

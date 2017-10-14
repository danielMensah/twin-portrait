import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import { Image } from 'react-bootstrap/lib';
import loadingGif from '../images/loading.gif';
import rotateLandscape from '../images/rotate_landscape.gif';
import LandmarksList from './landmark/landmarks-list';
import RegistrationModal from './modals/registration-modal';
import PortraitInfoModal from './modals/portrait-info/portrait-info-modal';
import { fetchPortrait, updatePortrait, setNotApplicable } from '../actions/portrait-actions';
import { selectLandmark, resetSelect } from '../actions/landmark-select-actions';
import KeyGenerator from '../util/landmark-key-generator';
import JoyrideTour from './joyride/joyride-tour';
import PortraitViewer from './portrait/portrait-viewer';
import FacialHairGenderList from './landmark/facial-hair-gender-list';
import FacialHairManager from '../util/managers/facial-hair-manager';
import { size, forEach } from 'lodash';

const NUM_PORTRAITS = 3; //5 portraits: 5-2 = 3; This is display submit button when it's the last one.

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      page: 0,
      showRegistrationModal: false,
      isLoading: true,
      showInfoModal: false
    }
  }

  closeRegistrationModal = () => {
    this.setState({ showRegistrationModal: false }, () => {
      browserHistory.push('/')
    });
  };

  closeInfoModal = () => {
    this.setState({ showInfoModal: false });
  };

  openRegistrationModal = () => {
    this.setState({ showRegistrationModal: true });
  };

  openInfoModal = () => {
    this.setState({ showInfoModal: true });
  };

  startLoading = () => {
    this.setState({isLoading: true});
  };

  stopLoading = () => {
    this.setState({isLoading: false});
  };

  componentDidMount() {
    this.props.fetchPortrait().then(() => {
      this.stopLoading();
    });
  }

  render() {
    const {page, isLoading, showRegistrationModal, showInfoModal} = this.state;
    const { portraitUrl, portraitId } = this.props;
    const currentPage = page+1;

    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Image src={loadingGif} />
        </div>
      )
    }

    return (
      <div id="app-container" className={styles.appContainer}>
        <div className={styles.turnLandscape}>
          <Image className={styles.rotateLandscape} src={rotateLandscape} responsive/>
          <span>Rotate your device to landscape</span>
        </div>
        <div id="container" className={styles.container}>
          <PortraitViewer portraitUrl={portraitUrl} currentPage={currentPage} NUM_PORTRAITS={NUM_PORTRAITS}
                          updatePortrait={this.updatePortrait} notApplicable={this.notApplicable} openInfoModal={this.openInfoModal}
                          page={page}/>
          {/*<Button onClick={this.openRegistrationModal}>Testing</Button>*/}
          <div id="landmark" className={styles.landmarks}>
            <FacialHairGenderList genderRef={el => this.gender = el} facialHairRef={el => this.facialHair = el}/>
            <LandmarksList/>
          </div>
        </div>
        <RegistrationModal show={showRegistrationModal} onHide={this.closeRegistrationModal} />
        <PortraitInfoModal show={showInfoModal} onHide={this.closeInfoModal} portraitUrl={portraitUrl} portraitId={portraitId} />
        <JoyrideTour/>
      </div>
    )
  }

  updatePortrait = () => {
    const { selectedLandmarks, portraitId, updatePortrait } = this.props;
    const { page } = this.state;

    let gender = ReactDOM.findDOMNode(this.gender).options[ReactDOM.findDOMNode(this.gender).selectedIndex].value;
    let facialHair = FacialHairManager(ReactDOM.findDOMNode(this.facialHair));

    if (size(selectedLandmarks) > 2) {
      let obj = { portraitId, gender, ...facialHair };

      forEach(selectedLandmarks, (item) => {
        obj[item.landmark] = {...item, landmarkKey: KeyGenerator(item.name, item.landmark)};
      });

      this.startLoading();
      updatePortrait(obj).then(() => {
        if (page > NUM_PORTRAITS) {
          this.stopLoading();
          this.openRegistrationModal();
        } else {
          this.setState({page: this.state.page+1});
          this.nextPortrait();
        }
      }).catch((e) => console.log('error', e));
    } else {
      alert('Please a shape from each facial feature');
    }
  };

  notApplicable = () => {
    const { setNotApplicable, portraitId } = this.props;

    this.startLoading();
    setNotApplicable({ portraitId }).then(() => {
      this.nextPortrait();
    })

  };

  nextPortrait = () => {
    this.startLoading();
    this.props.fetchPortrait().then(() => {
      this.stopLoading();
      this.props.resetSelect();
    });
  };
}

const mapStateProps = ({landmarkSelect, portrait}) => ({
  selectedLandmarks: landmarkSelect,
  portraitUrl: portrait.portraitURL,
  portraitId: portrait.id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortrait, selectLandmark, resetSelect, updatePortrait, setNotApplicable }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);
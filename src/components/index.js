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
import JoyrideTour from './joyride/joyride-tour';
import PortraitViewer from './portrait/portrait-viewer';
import FacialHairGenderList from './landmark/facial-hair-gender-list';
import FacialHairManager from '../util/managers/facial-hair-manager';
import { forEach } from 'lodash';
import Header from './header';

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

  openRegistrationModal = () => {
    this.setState({ showRegistrationModal: true });
  };

  closeRegistrationModal = () => {
    this.setState({ showRegistrationModal: false }, () => {
      browserHistory.push('/')
    });
  };

  openInfoModal = () => {
    this.setState({ showInfoModal: true });
  };

  closeInfoModal = () => {
    this.setState({ showInfoModal: false });
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

    const headerOptions = {
      title: 'Annotate Portrait',
      subtitle: 'Order each landmark from the most applicable to the portrait to the least'
    };

    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Image src={loadingGif} />
        </div>
      )
    }


    return (
      <div id="app-container" className={styles.appContainer}>
        <Header {...headerOptions}/>
        <div className={styles.turnLandscape}>
          <Image className={styles.rotateLandscape} src={rotateLandscape} responsive/>
          <span>Rotate your device to landscape</span>
        </div>
        <div id="container" className={styles.container}>
          <PortraitViewer portraitUrl={portraitUrl} currentPage={currentPage} NUM_PORTRAITS={NUM_PORTRAITS}
                          updatePortrait={this.updatePortrait} notApplicable={this.notApplicable} openInfoModal={this.openInfoModal}
                          page={page}/>
          {/*<Button onClick={this.openRegistrationModal}>Testing</Button>*/}
          <div className={styles.landmarks}>
            <FacialHairGenderList genderRef={el => this.gender = el} facialHairRef={el => this.facialHair = el}/>
            <LandmarksList/>
          </div>
        </div>
        <RegistrationModal show={showRegistrationModal} onHide={this.closeRegistrationModal} />
        <PortraitInfoModal show={showInfoModal} onHide={this.closeInfoModal} portraitUrl={portraitUrl} portraitId={portraitId} />
        <JoyrideTour type="tourCompleted" stepType="portrait"/>
      </div>
    )
  }

  updatePortrait = () => {
    const { selectedLandmarks, portraitId, updatePortrait } = this.props;
    const { page } = this.state;

    const gender = ReactDOM.findDOMNode(this.gender).options[ReactDOM.findDOMNode(this.gender).selectedIndex].value;
    const facialHair = FacialHairManager(ReactDOM.findDOMNode(this.facialHair));

    let dataToSend = { portraitId, gender };
    dataToSend['landmarks'] = {...facialHair};

    forEach(selectedLandmarks, (landmark) => {
      const key = Object.keys(landmark)[0];
      dataToSend['landmarks'][key] = landmark[key];
    });

    this.startLoading();
    updatePortrait(dataToSend).then(() => {
      if (page > NUM_PORTRAITS) {
        this.stopLoading();
        this.openRegistrationModal();
      } else {
        this.setState({page: this.state.page+1});
        this.nextPortrait();
      }
    })
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
    });
  };
}

const mapStateProps = ({landmarkSelect, portrait}) => ({
  selectedLandmarks: landmarkSelect,
  portraitUrl: portrait.portraitURL,
  portraitId: portrait.id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortrait,updatePortrait, setNotApplicable }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);
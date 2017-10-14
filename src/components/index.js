import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import { Image, FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib';
import loadingGif from '../images/loading.gif';
import rotateLandscape from '../images/rotate_landscape.gif';
import LandmarksField from './landmark/landmarks-field';
import RegistrationModal from './modals/registration-modal';
import PortraitInfoModal from './modals/portrait-info/portrait-info-modal';
import { fetchPortrait, updatePortrait, setNotApplicable } from '../actions/portrait-actions';
import { selectLandmark, resetSelect } from '../actions/landmark-select-actions';
import KeyGenerator from '../util/landmark-key-generator';
import JoyrideTour from './joyride/joyride-tour';
import PortraitViewer from './portrait/portrait-viewer';

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
            <div className={styles.extraInfo}>
              <FormGroup className={styles.form} controlId="formControlsSelect">
                <div id="area-chart" className={styles.gender}>
                  <ControlLabel>Select gender</ControlLabel>
                  <FormControl ref={(gender) => this.gender = gender} componentClass="select" placeholder="select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormControl>
                </div>
                <div className={styles.facialHair}>
                  <ControlLabel>Select facial hair</ControlLabel>
                  <FormControl ref={(facialHair) => this.facialHair = facialHair} componentClass="select" placeholder="select">
                    <option value="none">None</option>
                    <option value="mustache">Mustache</option>
                    <option value="beard">Beard</option>
                    <option value="both">Mustache and beard</option>
                  </FormControl>
                </div>
              </FormGroup>
            </div>
            <LandmarksField/>
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

    let gender = ReactDOM.findDOMNode(this.gender);
    gender = gender.options[gender.selectedIndex].value;

    let facialHair = ReactDOM.findDOMNode(this.facialHair);
    facialHair = facialHair.options[facialHair.selectedIndex].value;

    switch (facialHair) {
      case 'none':
        facialHair = { mustache: false, beard: false };
        break;
      case 'mustache':
        facialHair = { mustache: true, beard: false };
        break;
      case 'beard':
        facialHair = { mustache: false, beard: true };
        break;
      default:
        facialHair = { mustache: true, beard: true };
    }

    if (this.objectSizeValidation(selectedLandmarks) > 2) {
      let obj = { portraitId, gender, ...facialHair };

      for (let key in selectedLandmarks) {
        const item = selectedLandmarks[key];
        obj[item.landmark] = {...item, landmarkKey: KeyGenerator(item.name, item.landmark)};
      }

      this.startLoading();
      updatePortrait(obj).then((r) => {
        if ( r.response === 'error' ) {
          this.stopLoading();
          alert('there was an error when submitting, please try to resubmit the form again')
        } else  {
          if (page > NUM_PORTRAITS) {
            this.stopLoading();
            this.openRegistrationModal();
          } else {
            this.setState({page: this.state.page+1});
            this.nextPortrait();
          }
        }
      });
    } else {
      alert('Please a shape from each facial feature');
    }
  };

  notApplicable = () => {
    const { setNotApplicable, portraitId } = this.props;
    const obj = { portraitId };

    this.startLoading();
    setNotApplicable(obj).then(() => {
      this.nextPortrait();
    })

  };

  nextPortrait = () => {
    const { resetSelect, fetchPortrait } = this.props;

    this.startLoading();
    fetchPortrait().then(() => {
      this.stopLoading();
      resetSelect();
    });
  };

  objectSizeValidation = (obj) => {
    let size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }

    return size;
  };
}

const mapStateProps = ({landmarkSelect, portrait}) => ({
  selectedLandmarks: landmarkSelect,
  portraitUrl: portrait.portraitURL,
  portraitId: portrait.id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortrait, selectLandmark, resetSelect, updatePortrait, setNotApplicable }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);

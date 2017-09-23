import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import styles from './app.css';
import { Image, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib';
import loadingGif from '../../images/loading.gif';
import rotateLandscape from '../../images/rotate_landscape.gif';
import LandmarksField from '../../components/landmark/landmarks-field';
import RegistrationModal from '../../components/modals/registration-modal';
import PortraitInfoModal from '../../components/modals/portrait-info/portrait-info-modal';
import { fetchPortrait, updatePortrait, setNotApplicable } from '../../actions/portrait-actions';
import { selectLandmark, resetSelect } from '../../actions/landmark-select-actions';
import KeyGenerator from '../../util/landmark-key-generator';
import ReactImageMagnify from 'react-image-magnify';
import Fab from '../../components/floating-button';
import FontAwesome from 'react-fontawesome';
import JoyrideTour from './joyride-tour';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      page: 0,
      showModal: false,
      loading: true,
      showInfoModal: false
    }
  }

  close = () => {
    this.setState({ showModal: false }, () => {
      browserHistory.push('/')
    });
  };

  closeInfoModal = () => {
    this.setState({ showInfoModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  openInfoModal = () => {
    this.setState({ showInfoModal: true });
  };

  startLoading = () => {
    this.setState({loading: true});
  };

  stopLoading = () => {
    this.setState({loading: false});
  };

  componentDidMount() {
    this.props.fetchPortrait().then(() => {
      this.stopLoading();
    });
  }

  render() {
    const {page, loading, showModal, showInfoModal} = this.state;
    const { portraitUrl, portraitId } = this.props;
    const currentPage = page+1;

    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Image src={loadingGif} />
        </div>
      )
    }

    const imagePortrait = <ReactImageMagnify {...{
      smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: portraitUrl,
        sizes: '(min-width: 480px) 30vw, 80vw'
      },
      largeImage: {
        alt: '',
        src: portraitUrl,
        width: 1400,
        height: 1800
      }
    }} />;

    const submitNextButton = page > 8 ?
      <Button onClick={this.updatePortrait} className={styles.submit} bsSize="large" bsStyle="success">
        <FontAwesome className={styles.nextIcon} name="paper-plane" size="2x" />
      </Button> :
      <Button id="next-portrait" onClick={this.updatePortrait} className={styles.next} bsSize="large" bsStyle="primary">
        <FontAwesome className={styles.nextIcon} name="arrow-right" size="2x" />
      </Button>;

    return (
      <div id="app-container" className={styles.appContainer}>
        <div className={styles.turnLandscape}>
          <Image className={styles.rotateLandscape} src={rotateLandscape}/>
          <span>Rotate your device to landscape</span>
        </div>
        <div id="container" className={styles.container}>
          <div id="portraits" className={styles.portraits}>
            <span className={styles.helper}>
              <span id="page-track" className={styles.pageTrack} >{currentPage}/10</span>
              <span id="image-portrait">
                {imagePortrait}
              </span>
              <div id="portrait-info" onClick={this.openInfoModal} className={styles.more}>
                <Fab size="2x" icon="info-circle" />
              </div>
              <div className={styles.groupBtn}>
                <Button id="not-applicable" className={styles.notApplicable} bsSize="large" bsStyle="danger" onClick={this.notApplicable}>
                  <FontAwesome className={styles.notAppIcon} name="times" size="2x" />
                </Button>
                {submitNextButton}
              </div>
              {/*<Button onClick={this.open}>Testing</Button>*/}
            </span>
          </div>
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
        { showModal ? <RegistrationModal show={showModal} onHide={this.close} /> : null}
        { showInfoModal ? <PortraitInfoModal show={showInfoModal} onHide={this.closeInfoModal} portraitUrl={portraitUrl} portraitId={portraitId} /> : null}
        <JoyrideTour/>
      </div>
    )
  }

  testFinishModal = () => {
    this.open();
  };

  updatePortrait = () => {
    const { selected, portraitUrl, updatePortrait } = this.props;
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

    if (this.objectSize(selected) > 2) {
      let obj = { portraitUrl, gender, ...facialHair };

      for (let key in selected) {
        const item = selected[key];
        obj[item.landmark] = {...item, landmarkKey: KeyGenerator(item.name, item.landmark)};
      }

      this.startLoading();
      updatePortrait(obj).then((r) => {
        if ( r.response === 'error' ) {
          this.stopLoading();
          alert('there was an error when submitting, please try to resubmit the form again')
        } else  {
          if (page > 8) {
            this.stopLoading();
            this.open();
          } else {
            this.setState({page: this.state.page+1});
            this.nextPortrait();
          }
        }
      });
    } else {
      alert('Please a style from each facial feature');
    }
  };

  notApplicable = () => {
    const { setNotApplicable, portraitUrl } = this.props;
    const obj = { portraitUrl };

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

  objectSize = (obj) => {
    let size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }

    return size;
  };
}

const mapStateProps = ({landmarkSelect, portrait}) => ({
  selected: landmarkSelect,
  portraitUrl: portrait.portraitURL,
  portraitId: portrait.id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortrait, selectLandmark, resetSelect, updatePortrait, setNotApplicable }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);

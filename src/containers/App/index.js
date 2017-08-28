import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './app.css';
import {Image, Button, Modal, FormGroup, FormControl} from 'react-bootstrap/lib';
import tickImg from '../../images/tick.png';
import loadingGif from '../../images/loading.gif';
import LandmarksField from '../../components/landmark/landmarks-field';
import { fetchPortrait, updatePortrait } from '../../actions/portrait-actions';
import { selectLandmark, resetSelect } from '../../actions/landmark-select-actions';
import KeyGenerator from '../../util/landmark-key-generator';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      page: 0,
      showModal: false,
      loading: true
    }
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
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
    const {page, loading} = this.state;
    const { portrait } = this.props;

    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Image src={loadingGif} />
        </div>
      )
    }

    const currentPage = page+1;

    const formInstance = (
      <form>
        <FormGroup>
          <FormControl type="email" placeholder="Email..." />
        </FormGroup>

        <Button className={styles.submitButton} type="submit">
          Submit
        </Button>
      </form>
    );
    return (
      <div id="app-container" className={styles.appContainer}>
        <div className={styles.container}>
          <div id="portraits" className={styles.portraits}>
            <span className={styles.helper}>
              <Image id="avatar" src={portrait} />
              { page > 8 ?
                <Button onClick={this.done} className={styles.submit} bsSize="large" bsStyle="success">Submit</Button> :
                <div className={styles.buttons}>
                  <Button bsSize="large" bsStyle="primary" onClick={this.movePage}>Next ({currentPage}/10)</Button>
                  <Button bsSize="large" bsStyle="danger" onClick={this.notApplicable}>Not Applicable</Button>
                </div>}
            </span>
          </div>
          <div className={styles.landmarks}>
            <LandmarksField/>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton />
          <Modal.Body className={styles.modalBody}>
            <Image src={tickImg} className={styles.tickImg}/>
            <h2>Awesome!</h2>
            <br/>
            <br/>
            <p>Enter your email below and you will be sent a promo code to use TwinPortrait for free once completed</p>
            {formInstance}
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  movePage = () => {
    const { selected, portrait,updatePortrait } = this.props;

    if (this.objectSize(selected) > 4) {
      let obj = { portraitUrl: portrait };

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
          this.setState({page: this.state.page+1});
          this.nextPortrait();
        }
      });
    } else {
      alert('Please a style from each facial feature');
    }
  };

  done = () => {
    console.log('hello', this.props.selected);
    this.open();
  };

  notApplicable = () => {
    this.nextPortrait();
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
  portrait: portrait.portraitURL
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortrait, selectLandmark, resetSelect, updatePortrait }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './app.css';
import {Image, Button, Modal, FormGroup, FormControl} from 'react-bootstrap/lib';
import tickImg from '../../images/tick.png';
import loadingGif from '../../images/loading.gif';
import LandmarksField from '../../components/landmark/landmarks-field';
import { fetchPortrait } from '../../actions/portrait-actions';

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

  componentDidMount() {
    this.nextPortrait();
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
                  <Button bsSize="large" bsStyle="danger" onClick={this.movePage}>Not Applicable</Button>
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
    this.setState({page: this.state.page+1});
    this.nextPortrait();
    console.log('hello', this.props.selected);
  };

  done = () => {
    console.log('hello', this.props.selected);
    this.open();
  };

  nextPortrait = () => {
    this.setState({loading: true});
    this.props.fetchPortrait().then(() => {
      this.setState({loading: false})
    });
  }
}

const mapStateProps = ({landmarkSelect, portrait}) => ({
  selected: landmarkSelect,
  portrait: portrait.portraitURL
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortrait }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);

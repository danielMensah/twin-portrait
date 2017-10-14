import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './registration-modal.css';
import { bindActionCreators } from 'redux';
import {Image, Button, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap/lib';
import tickImg from '../../images/tick.png';
import loadingImg from '../../images/loading2.gif';
import { registerUser } from '../../actions/user-actions';

class RegistrationModal extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      email: '',
      feedback: '',
      promoCode: '',
      loading: false,
      error: false,
      emailExists: ''
    }
  }

  handleInput = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;

    this.setState({[fieldName]: fieldValue})
  };

  startLoading = () => {
    this.setState({loading: true});
  };

  stopLoading = () => {
    this.setState({loading: false});
  };

  render() {
    const { show, onHide } = this.props;
    const { promoCode, loading, error, emailExists } = this.state;

    const header = promoCode ? 'Here\'s your code! Once this dialog is closed, you will be redirected to the home page.' : 'Thank you!';

    const formInstance = (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormControl onChange={(e) => this.handleInput(e)} type="email" placeholder="Email" name="email"/>
          <span className={styles.error}>{emailExists}</span>
          <ControlLabel className={styles.feedbackLabel}>Feedback (optional)</ControlLabel>
          <FormControl className={styles.feedback} onChange={(e) => this.handleInput(e)} name="feedback" componentClass="textarea" placeholder="Write about any challenges you faced using Twin portrait..." />
        </FormGroup>

        <Button className={styles.submitButton} type="submit">
          Submit
        </Button>
      </form>
    );

    const code = (
      <div className={styles.promoCode}>{promoCode}</div>
    );

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton/>
        <Modal.Body className={styles.modalBody}>
          { loading ? <Image src={loadingImg}/> :
            <div>
              <Image src={tickImg} className={styles.tickImg}/>
              <h2>{header}</h2>
              <br/>
              { error ? <span className={styles.error}>Please enter your email address!</span> : null}
              { promoCode ? null : <p>Please complete the form below and a promo code will be generated for you.</p>}
              { promoCode ? code : formInstance}
            </div>
          }
        </Modal.Body>
      </Modal>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.email) {
      this.setState({ error: true });
      return;
    }

    let obj = {
      email: this.state.email,
      feedbac: this.state.feedback
    };

      this.startLoading();
      this.props.registerUser(obj).then((r) => {
        switch (r.response) {
          case 'updated':
            this.setState({ promoCode: r.promoCode, error: false, emailExists: '' });
            break;
          case 'error':
            alert('Error! Please contact admin: k1422655@kingston.ac.uk');
            break;
          default:
            this.setState({ emailExists: r.response, error: false, });
        }

        this.stopLoading();
      });

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ registerUser }, dispatch);

export default connect(null, mapDispatchToProps)(RegistrationModal);

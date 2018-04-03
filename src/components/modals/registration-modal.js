import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './registration-modal.css';
import { bindActionCreators } from 'redux';
import { Dialog, FlatButton } from 'material-ui';
import {Image, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap/lib';
import tickImg from '../../images/tick.png';
import loadingImg from '../../images/loading2.gif';
import { registerUser } from '../../actions/user-actions';
import Routing from '../../util/routing';

class RegistrationModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    match: PropTypes.number,
    satisfaction: PropTypes.number
  };

  static defaultProps = {
    match: 0,
    satisfaction: null
  };

  constructor(prop) {
    super(prop);
    this.state = {
      email: '',
      feedback: '',
      promoCode: '',
      loading: false,
      error: false,
      emailExists: '',
      update: false,
      add: false
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
    const { show, onHide, satisfaction } = this.props;
    const { promoCode, loading, error, emailExists, update, add } = this.state;

    const header = add ? 'Here\'s your code! You will be able to use Twin Portrait for free with this code once it is officially launched.'
      : 'Thank you!';

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

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={onHide}
      />
    ];

    const satisfactionText = satisfaction ? <div>We are happy that you were satisfied with the results! We could increase the accuracy of the matching system, but we need your help!
      Click on the link below to increase the number of annotate portraits in our database.</div> :
      <div>We a sorry that we couldn't satisfy your expectations. To increase the system's accuracy, help us by annotating more portraits.
        This will increase the number of annotated portrait in our database.</div>;

    return (
      <Dialog
        title={header}
        actions={actions}
        modal={false}
        open={show}
        onRequestClose={onHide}
        autoScrollBodyContent={true}>
        { loading ? <Image src={loadingImg}/> :
          <div style={{ textAlign: 'center' }}>
            <Image src={tickImg} className={styles.tickImg}/>
            <h2>{header}</h2>
            <br/>
            { error ? <span className={styles.error}>Please enter your email address!</span> : null}
            { add || update ? null : <p>Please complete the form below and a promo code will be generated for you.</p>}
            { add ? code : update ? satisfactionText : formInstance}
            { add || update ? <a href={Routing('/match-portrait')}>Annotate Portrait</a> : null }
          </div>
        }
      </Dialog>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.email) {
      this.setState({ error: true });
      return;
    }

    const { match, satisfaction } = this.props;

    let obj = {
      email: this.state.email,
      feedback: this.state.feedback,
      match,
      satisfaction
    };

      this.startLoading();
      this.props.registerUser(obj).then((r) => {
        switch (r.response) {
          case 'add':
            this.setState({ promoCode: r.promoCode, error: false, emailExists: '', add: true });
            break;
          case 'update':
            this.setState({ update: true });
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Panel, Image, Button, Form, FormControl, FormGroup, Col } from 'react-bootstrap/lib';
import logo from '../../../images/Olep_white_.png';
import styles from './login.css';
import ForgotPassword from '../modals/forgot-password';
import Accessibilities from '../extras/accessibilities/accessibilities';
import { loginAction } from '../../../actions/login-actions';

class Login extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      username: '',
      password: '',
      error: false,
      busy: false
    }
  }

  render() {
    const Logo = <Image className={styles.logo} src={logo} />;
    const { busy, error } = this.state;

    return (
      <div className={styles.container}>
        <Accessibilities />
        <div>
          <Panel className={styles.loginContainer} header={Logo} bsStyle="info">
            <div className={styles.title}>login to continue</div>
            <Form horizontal onSubmit={this.handleLogin}>
              <FormGroup controlId="formHorizontalEmail">
                <Col className={styles.col} sm={10}>
                  <FormControl onChange={this.setUsername} className={styles.input} type="text" placeholder="Username" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col className={styles.col} sm={10}>
                  <FormControl onChange={this.setPassword} className={styles.input} type="password" placeholder="Password" />
                </Col>
              </FormGroup>
              {error ? <div className={styles.error}>Wrong username or password. Try again.</div> : null}
              <ForgotPassword />
              <Button type="submit" onClick={this.handleLogin} className={styles.loginButton} bsStyle="primary" bsSize="large" block disabled={busy}>
                {busy ? 'Please wait...' : 'Login'}
              </Button>
            </Form>
          </Panel>
        </div>
      </div>
    )
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { loginAction } = this.props;
    const { username, password } = this.state;

    this.setState({ busy: true}, () => {
      loginAction(username, password).then((response) => {
        response.u_token ? browserHistory.push('/dashboard') : this.setState({ error: true, busy: false })
      });
    });
  };

  setUsername = (event) => {
    this.setState({ username: event.target.value});
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value});
  };

}

const mapDispatchToProps = (dispatch) => bindActionCreators({ loginAction }, dispatch);

export default connect(null, mapDispatchToProps)(Login);
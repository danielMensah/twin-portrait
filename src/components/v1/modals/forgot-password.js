import React, { Component } from 'react';
import styles from './forgot-password.css';
import { Modal, Button, Form, Col, FormGroup, FormControl } from 'react-bootstrap/lib';

class ForgotPassword extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      showModal: false,
      email: ''
    };
  }

  render() {

    return (
      <div>
        <div onClick={this.open} className={styles.forgotPassword}>Forgot your Password?</div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className={styles.form} horizontal onSubmit={this.recoverPassword}>
              <FormGroup className={styles.formGroup} controlId="formHorizontalEmail">
                <Col className={styles.inputCol} sm={10}>
                  <FormControl onChange={this.handleOnChange} className={styles.input} type="email" placeholder="Email..." />
                </Col>
              </FormGroup>
              <Button onClick={this.recoverPassword} className={styles.btnSubmit} type="submit" bsStyle="primary" block>Send Email</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer className={styles.footer}>
            <Button className={styles.btnClose} onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  handleOnChange = (event) => {
    this.setState({ email: event.target.value });
  };

  recoverPassword = (event) => {
    console.log(this.state.email)
  }
}

export default (ForgotPassword)

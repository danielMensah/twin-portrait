import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styles from './registration-modal.css';
// import { Modal } from 'react-bootstrap/lib';
import { Dialog, FlatButton } from 'material-ui';
import Body from './help-body/body';

class HelpModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    landmark: PropTypes.string.isRequired
  };

  render() {
    const { show, onHide, landmark } = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={onHide}
      />
    ];
    return (
      <Dialog
        title={`How to choose ${landmark} shape`}
        actions={actions}
        modal={false}
        open={show}
        onRequestClose={onHide}
        autoScrollBodyContent={true}
      >
        <Body landmark={landmark}/>
      </Dialog>
    )
  }
}

{/*<Dialog bsSize="large" show={show} onHide={onHide}>*/}
  {/*<Modal.Header closeButton>*/}
    {/*<Modal.Title id="contained-modal-title-lg">How to choose {landmark} shape</Modal.Title>*/}
  {/*</Modal.Header>*/}
  {/*<Modal.Body className={styles.modalBody}>*/}
    {/*<Body landmark={landmark}/>*/}
  {/*</Modal.Body>*/}
{/*</Dialog>*/}

export default connect()(HelpModal);

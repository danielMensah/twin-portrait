import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './style.css';
import RegistrationModal from '../modals/registration-modal';

class Satisfaction extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, satisfaction: 0 }
  }

  render() {
    const { showModal, satisfaction } = this.state;

    const modalOptions = {
      show: showModal,
      onHide: this.closeModal,
      match: 1,
      satisfaction
    };

    return (
      <div style={{marginTop: '15px'}}>
        <label>Are you satisfied with the result?</label>
        <div style={{justifyContent: 'center'}} className={styles.satisfactionButtons}>
          <div style={{marginRight: '50px', fontSize: '30px', cursor: 'pointer'}} onClick={() => this.openModal(0)}>👎</div>
          <div style={{fontSize: '30px', cursor: 'pointer'}} onClick={() => this.openModal(1)}>👍</div>
        </div>
        <RegistrationModal {...modalOptions} />
      </div>
    )
  }

  openModal = (satisfaction) => {
    this.setState({ showModal: true, satisfaction });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  }

}

export default connect()(Satisfaction);

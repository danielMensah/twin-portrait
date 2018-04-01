import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Dialog } from 'material-ui';
import { Image } from 'react-bootstrap';
import SearchSVG from '../../images/search.svg';
// import styles from './search-modal.css';

class SearchModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {
    const { show } = this.props;
    const contentStyle = {
      width: '70%',
      textAlign: 'center'
    };

    const dialogSettings = {
      modal: false,
      open: show,
      contentStyle
    };

    return (
      <Dialog {...dialogSettings}>
        <h1 style={{ marginTop: '50px' }}> Searching for your Doppelganger.....</h1>
        <Image src={SearchSVG}/>
      </Dialog>
    )
  }

}

export default connect()(SearchModal);

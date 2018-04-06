import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import { Image } from 'react-bootstrap';
import SearchSVG from '../../images/search.svg';

class SearchModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    error: PropTypes.bool
  };

  static defaultProps = {
    error: false
  };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {
    const { show, onHide, error } = this.props;
    const contentStyle = {
      width: '70%',
      textAlign: 'center'
    };
    const errorMessage = 'An error occurred while we were matching you with a portrait. Try again. If the error persists, then contact the admin: k1422655@kingston.ac.uk';
    const header = error ?
      <div style={{ color: '#bc0001', display: 'flex', flexDirection: 'column'}}><i style={{ fontSize: '50px' }} className="material-icons">warning</i> Oh snap!</div>
      : 'We are matching you with a portrait.....';

    const actions = error ? [
      <FlatButton
        label="Close"
        primary={true}
        onClick={onHide}
      />
    ] : null;

    const dialogSettings = {
      modal: error,
      open: show,
      contentStyle,
      actions
    };

    return (
      <Dialog {...dialogSettings}>
        <h1 style={{ marginTop: '50px' }}>{header}</h1>
        {error ? errorMessage : <Image src={SearchSVG}/>}
      </Dialog>
    )
  }

}

export default connect()(SearchModal);

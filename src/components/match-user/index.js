import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import Main from './main';
import Header from './header';
// import { Button } from 'react-bootstrap/lib';
// import FontAwesome from 'react-fontawesome';

class UserMatch extends Component {

  componentDidMount() {
    document.getElementById('root').firstChild.style.textAlign = 'center';
  }

  // static propTypes = {
  // };

  render() {
    return (
      <MuiThemeProvider styles={{textAlign: 'center'}}>
        <div>
          <Header title="Find Doppelgänger" subtitle="Order each landmark from the most applicable to the least"/>
          <Main/>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect()(UserMatch);

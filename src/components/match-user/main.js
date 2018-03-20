import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import { AppBar, MuiThemeProvider, MenuItem, Menu } from 'material-ui';
import styles from './main.css';
import Landmarks from '../landmark/landmarks-list';
// import { Button } from 'react-bootstrap/lib';
// import FontAwesome from 'react-fontawesome';

class Main extends Component {

  // static propTypes = {
  // };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {

    return (
      <div className={styles.main}>
        <Landmarks/>
      </div>
    )
  }

}

export default connect()(Main);

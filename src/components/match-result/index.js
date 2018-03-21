import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { MuiThemeProvider, RaisedButton } from 'material-ui';
import styles from './style.css';
import Header from '../match-user/header';

class MatchResult extends Component {

  // static propTypes = {
  // };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {

    return (
      <MuiThemeProvider>
        <div className={styles.container}>
          <Header title="Results"/>
          <RaisedButton
            label="Back"
            primary={true}
            onClick={this.back}/>
        </div>
      </MuiThemeProvider>
    )
  }

  back = () => {
    browserHistory.push('/match-user');
  }

}

export default connect()(MatchResult);

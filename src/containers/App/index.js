global.logger = require('logger');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../../components/v1/navbar/nav-bar';
import Sidebar from '../../components/v1/sidebar/side-bar';
import styles from './app.css';
import Chat from '../../components/v1/chat';
import FontAwesome from 'react-fontawesome';
import { checkSessionState } from '../../actions/check-session-action';
import LocalStorage from '../../util/local-storage';
import Login from '../../components/v1/login/login';
import Constants from '../../constants/general-constants';
import { browserHistory } from 'react-router';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      loading: true,
      showChat: true
    }
  }

  componentWillMount() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({ showChat: false })
    }

    this.props.checkSessionState(LocalStorage.getItem(Constants.TOKEN_KEY)).then(() => {
      this.setState({ loading: false });
    })
  }

  render() {
    const { loading, showChat } = this.state;
    const { sessionState } = this.props;

    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <FontAwesome className={styles.loadingIcon} size="4x" name='spinner' pulse />
        </div>
      )
    }

    if (!sessionState) {
      return <Login />
    }

    return (
      <div id="app-container" className={styles.appContainer}>
        <Navbar />
        <div className={styles.subContainer}>
          <Sidebar />
          <div className={styles.container}>
            {this.routeToChildren()}
          </div>
        </div>
        {showChat ? <Chat /> : null}
      </div>
    )
  }

  routeToChildren = () => {
    const isLoginPage = this.props.children.props.location.pathname  === "/";
    return isLoginPage ? browserHistory.push('/dashboard') : this.props.children;
  };
}

const mapStateProps = ({ checkSession }) => ({
  sessionState: +checkSession.state
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ checkSessionState }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(App);

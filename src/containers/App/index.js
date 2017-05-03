import React, { Component } from 'react';
import Navbar from '../../components/v1/navbar/nav-bar';
import Sidebar from '../../components/v1/sidebar/side-bar';
import styles from './app.css';
import Chat from '../../components/v1/chat';
import FontAwesome from 'react-fontawesome';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      loading: true,
      showChat: true
    }
  }

  componentWillMount() {
    window.onload = () => {
      this.setState({ loading: false })
    }

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({ showChat: false })
    }
  }

  render() {
    const currentPage = this.props.children.props.location.pathname;
    const { loading, showChat } = this.state;

    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <FontAwesome className={styles.loadingIcon} size="4x" name='spinner' pulse />
        </div>
      )
    } else if (currentPage === "/") {
      return this.props.children;
    }

    return (
      <div id="app-container" className={styles.appContainer}>
        <Navbar />
        <div className={styles.subContainer}>
          <Sidebar />
          <div className={styles.container}>
            {this.props.children}
          </div>
        </div>
        {showChat ? <Chat /> : null}
      </div>
    )
  }
}

export default (App)

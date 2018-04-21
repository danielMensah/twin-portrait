import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Statistics from './statistics';
import StatsTable from './stats-table';
import styles from './admin-panel.css';
import { fetchStatistics } from '../../actions/statistics-actions';
import { Image } from 'react-bootstrap';
import loadingImg from '../../images/loading2.gif';
import Header from '../header';
import { MuiThemeProvider } from 'material-ui';

class AdminPanel extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      portraitData: [],
      numberOfCompletedPortraits: null,
      userData: [],
      numberOfUsers: null,
      malePortraits: 0,
      femalePortraits: 0,
      loading: true
    }
  }

  componentWillMount() {
    this.props.fetchStatistics().then((r) => {
      this.setState({
        portraitData: r.completedLandmarks,
        numberOfCompletedPortraits: r.completedLandmarksCount,
        userData: r.registeredUsers,
        numberOfUsers: r.registeredUsersCount,
        malePortraits: r.malePortraits,
        femalePortraits: r.femalePortraits
      }, () => this.setState({ loading: false }))
    });

  }

  render() {
    const { userData, portraitData, loading } = this.state;

    if (loading) return <div className={styles.loadingContainer} ><Image src={loadingImg}/></div>;

    return (
      <MuiThemeProvider>
        <div className={styles.container}>
          <Header title="Panel" subtitle="This page displays statistics about the website"/>
          <Statistics {...this.state} />
          <div className={styles.tablesContainer}>
            <StatsTable type="user" data={userData} />
            <StatsTable type="portrait" data={portraitData} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateProps = ({ statistics }) => ({
  userData: statistics.registeredUsers,
  portraitData: statistics.completedLandmarks,
  stats: statistics
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchStatistics }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(AdminPanel);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Statistics from './statistics';
import StatsTable from './stats-table';
import styles from './admin-panel.css';
import { fetchStatistics } from '../../actions/statistics-actions';
import { Image } from 'react-bootstrap';
import loadingImg from '../../images/loading2.gif';

class AdminPanel extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      landmarkData: [],
      completedLandmarksCount: null,
      userData: [],
      registeredUsersCount: null,
      loading: true
    }
  }

  componentWillMount() {
    this.props.fetchStatistics().then((r) => {
      this.setState({
        landmarkData: r.completedLandmarks,
        completedLandmarksCount: r.completedLandmarksCount,
        userData: r.registeredUsers,
        registeredUsersCount: r.registeredUsersCount
      }, () => this.setState({ loading: false }))
    });

  }

  render() {
    const { userData, landmarkData, completedLandmarksCount, registeredUsersCount, loading } = this.state;

    if (loading) return <div className={styles.loadingContainer} ><Image src={loadingImg}/></div>;

    return (
      <div className={styles.container}>
        <Statistics numberOfCompletedLandmarks={completedLandmarksCount} numberOfUsers={registeredUsersCount} userData={userData} landmarkData={landmarkData} />
        <div className={styles.tablesContainer}>
          <StatsTable type="user" data={userData} />
          <StatsTable type="landmark" data={landmarkData} />
        </div>
      </div>
    )
  }

}

const mapStateProps = ({ statistics }) => ({
  userData: statistics.registeredUsers,
  landmarkData: statistics.completedLandmarks,
  stats: statistics
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchStatistics }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(AdminPanel);

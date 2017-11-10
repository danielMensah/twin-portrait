import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Statistics from './statistics';
import StatsTable from './stats-table';
import styles from './admin-panel.css';
import { fetchStatistics } from '../../actions/statistics-actions';

class AdminPanel extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      landmarkData: [],
      completedLandmarksCount: null,
      userData: [],
      registeredUsersCount: null
    }

  }

  componentWillMount() {
    this.props.fetchStatistics().then((r) => {
      this.setState({
        landmarkData: r.completedLandmarks,
        completedLandmarksCount: r.completedLandmarksCount,
        userData: r.registeredUsers,
        registeredUsersCount: r.registeredUsersCount
      })
    });

  }

  render() {
    const { userData, landmarkData } = this.state;
    return (
      <div className={styles.container}>
        <Statistics/>
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

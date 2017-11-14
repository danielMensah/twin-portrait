import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Graph from './graph';
import GenderPieChart from './pie-chart';
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
    this.props.fetchStatistics().then((response) => {
      this.setState({
        landmarkData: response.completedLandmarks,
        completedLandmarksCount: response.completedLandmarksCount,
        userData: response.registeredUsers,
        registeredUsersCount: response.registeredUsersCount
      }, () => this.setState({ loading: false }))
    });

  }

  render() {
    const { userData, landmarkData, completedLandmarksCount, registeredUsersCount, loading } = this.state;

    if (loading) return <div className={styles.loadingContainer} ><Image src={loadingImg}/></div>;

    return (
      <div className={styles.container}>
        <Graph numberOfCompletedLandmarks={completedLandmarksCount} numberOfUsers={registeredUsersCount} userData={userData} landmarkData={landmarkData} />
        <GenderPieChart landmarkData={landmarkData}/>
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

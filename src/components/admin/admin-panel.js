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
      portraitData: [],
      completedPortraitsCount: null,
      userData: [],
      registeredUsersCount: null,
      loading: true
    }
  }

  componentWillMount() {
    this.props.fetchStatistics().then((r) => {
      this.setState({
        portraitData: r.completedLandmarks,
        completedPortraitsCount: r.completedLandmarksCount,
        userData: r.registeredUsers,
        registeredUsersCount: r.registeredUsersCount
      }, () => this.setState({ loading: false }))
    });

  }

  render() {
    const { userData, portraitData, completedPortraitsCount, registeredUsersCount, loading } = this.state;

    if (loading) return <div className={styles.loadingContainer} ><Image src={loadingImg}/></div>;

    return (
      <div className={styles.container}>
        <Statistics numberOfCompletedPortraits={completedPortraitsCount} numberOfUsers={registeredUsersCount} userData={userData} portraitData={portraitData} />
        <div className={styles.tablesContainer}>
          <StatsTable type="user" data={userData} />
          <StatsTable type="portrait" data={portraitData} />
        </div>
      </div>
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

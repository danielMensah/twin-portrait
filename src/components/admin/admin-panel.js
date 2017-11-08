import React, { Component } from 'react';
import { connect } from 'react-redux';
import Statistics from './statistics';
import StatsTable from './stats-table';
import styles from './admin-panel.css';
// import { fetchStatistics } from '../../actions/statistics-actions';
// import { Image, Button, ControlLabel } from 'react-bootstrap/lib';
// import { browserHistory } from 'react-router';

class AdminPanel extends Component {

  render() {
    const data = {
      users: [
        {
          userId: "0001",
          email: 'test@gmail.com',
          date_registered: '22/10/2017',
          feedback: 'Easy to use'
        },
        {
          userId: "0002",
          email: 'test22@gmail.com',
          date_registered: '22/09/2017',
          feedback: 'Terrible :('
        }
      ]
    };

    return (
      <div className={styles.container}>
        <Statistics/>
        <StatsTable type="user" data={data} />
      </div>
    )
  }

}

export default connect()(AdminPanel);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { sortBy, find, findIndex } from 'lodash';
import moment from 'moment';
import styles from './statistics.css';

class Statistics extends Component {

  static propTypes = {
    userData: PropTypes.array.isRequired,
    portraitData: PropTypes.array.isRequired,
    numberOfUsers: PropTypes.number.isRequired,
    numberOfCompletedPortraits: PropTypes.number.isRequired
  };

  render() {
    const { numberOfCompletedPortraits, numberOfUsers } = this.props;
    const data = this.getGraphData();
    const lineChartProps = {
      width: 600,
      height: 300,
      data,
      style: {
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      margin: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }
    };

    return (
      <div className={styles.statisticsContainer}>
        <LineChart {...lineChartProps}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="Portraits" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="Users" stroke="#82ca9d"/>
        </LineChart>
        <div className={styles.extraStats}>
          <h3>Data analysis</h3>
          <p><b>Completed portraits:</b> {numberOfCompletedPortraits}/1100</p>
          <p><b>Registered users:</b> {numberOfUsers}</p>
          <p><b>Average portrait completed per user:</b> { (numberOfCompletedPortraits/numberOfUsers).toFixed(2) }</p>
          <p><b>Average daily portrait completed:</b> { (numberOfCompletedPortraits/data.length).toFixed(2) }</p>
          <p><b>Average daily registered users:</b> { (numberOfUsers/data.length).toFixed(2) }</p>
        </div>
      </div>
    )
  }

  getGraphData = () => {
    const { userData, portraitData } = this.props;
    const userDataArray = this.generateGraphData('user', userData, []);
    const numberOfCompletedPortraits = this.generateGraphData('portrait', portraitData, userDataArray);

    return sortBy(numberOfCompletedPortraits, (o) => o.date);
  };

  generateGraphData = (dataType, dataArray, processedDataArray) => {
    const dateProp = dataType === 'user' ? 'registered_at' : 'date_completed';

    dataArray.forEach((data) => {
      const date = moment(data[dateProp]).format('DD/MM/YYYY');
      let obj = find(processedDataArray, { date: date });
      let index = findIndex(processedDataArray, { date: date });

      if (!obj) {
        dataType === 'user' ? processedDataArray.push({ date: date, Users: 1, Portraits: 0 }) :
          processedDataArray.push({ date: date, Users: 0, Portraits: 1 });
      } else {
        dataType === 'user' ? processedDataArray.splice(index, 1, {date: date, Users: obj.Users + 1, Portraits: 0}) :
          processedDataArray.splice(index, 1, { ...obj, Portraits: obj.Portraits + 1});
      }
    });

    return processedDataArray;
  }

}

export default connect()(Statistics);

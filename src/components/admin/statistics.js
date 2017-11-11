import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { sortBy, find, findIndex } from 'lodash';
import moment from 'moment';

class Statistics extends Component {

  static propTypes = {
    userData: PropTypes.array.isRequired,
    landmarkData: PropTypes.array.isRequired
  };

  render() {
    const data = this.generateGraphData();

    return (
      <div>
        <LineChart style={{ marginLeft: 'auto', marginRight: 'auto'}} width={600} height={300} data={data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="Landmarks" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="Users" stroke="#82ca9d"/>
        </LineChart>
      </div>
    )
  }

  generateGraphData = () => {
    const { userData, landmarkData } = this.props;
    let dateArray = [];

    userData.forEach((user) => {
      const date = moment(user.registered_at).format('DD/MM/YYYY');
      let obj = find(dateArray, { date: date });
      let index = findIndex(dateArray, { date: date });

      if (!obj) {
        dateArray.push({ date: date, Users: 1, Landmarks: 0 })
      } else {
        dateArray.splice(index, 1, {date: date, Users: obj.Users + 1, Landmarks: 0})
      }
    });

    landmarkData.forEach((landmark) => {
      const date = moment(landmark.date_completed).format('DD/MM/YYYY');
      let obj = find(dateArray, { date: date });
      let index = findIndex(dateArray, { date: date });

      if (!obj) {
        dateArray.push({ date: date, Users: 0, Landmarks: 1 })
      } else {
        dateArray.splice(index, 1, {date: date, Users: obj.Users, Landmarks: obj.Landmarks + 1})
      }
    });

    return sortBy(dateArray, (o) => o.date);
  }

}

export default connect()(Statistics);

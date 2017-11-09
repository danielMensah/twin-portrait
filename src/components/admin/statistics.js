import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Statistics extends Component {

  render() {

    const data = [
      {date: '20/10/17', Users: 4000, Landmarks: 2400},
      {date: '22/10/17', Users: 3000, Landmarks: 1398},
      {date: '23/10/17', Users: 2000, Landmarks: 9800, amt: 2290},
      {date: '29/10/17', Users: 2780, Landmarks: 3908, amt: 2000},
      {date: '02/11/17', Users: 1890, Landmarks: 4800, amt: 2181},
      {date: '05/11/17', Users: 2390, Landmarks: 3800, amt: 2500},
      {date: '06/11/17', Users: 3490, Landmarks: 4300, amt: 2100},
    ];

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

}

export default connect()(Statistics);

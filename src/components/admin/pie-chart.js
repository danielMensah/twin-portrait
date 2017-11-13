import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { findIndex } from 'lodash';
// import moment from 'moment';
import styles from './graph.css';

class GenderPieChart extends Component {

  static propTypes = {
    landmarkData: PropTypes.array.isRequired,
  };

  render() {
    const data = this.generateGenderData();
    const COLORS = ['#0088FE', '#c488a0'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <div className={styles.statisticsContainer}>
        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            cx={300}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>
      </div>
    )
  }

  generateGenderData = () => {
    const { landmarkData } = this.props;
    let male = 0;
    let female = 0;

    landmarkData.forEach((landmark) => {
      landmark.gender === 'male' ? male++ : female++;
    });

    return [ {name: 'male', value: male }, { name: 'female', value: female }];
  }
}

export default connect()(GenderPieChart);

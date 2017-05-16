import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { PieChart, Pie } from 'recharts';
import styles from './grade-total-widget.css';
import { Panel } from 'react-bootstrap/lib';
import { blue_celestial } from '../../../util/color-scheme';
const MAX_GRADE = 100;

class GradeTotalWidget extends Component {

  render() {
    const grade = 80;
    const remain = MAX_GRADE - grade;

    const chartData = [
      {name: 'grades', value: grade, fill: blue_celestial()},
      {name: 'remain', value: remain, fill: '#eee'}
    ];

    return (
      <Panel footer="System Environment" className={styles.panel}>
        <div className={styles.container}>
          <div className={styles.label}>Current grade (total)</div>
          <PieChart width={250} height={244}>
            <text className={styles.gradeTotal} x={125} y={125} textAnchor="middle" dominantBaseline="middle">
              {`${grade}%`}
            </text>
            <Pie data={chartData} cx="50%" cy="50%" startAngle={5}
                 endAngle={-355} innerRadius="70%" outerRadius="80%" stroke="none" />
          </PieChart>
        </div>
      </Panel>
    )
  }
}

export default (GradeTotalWidget);
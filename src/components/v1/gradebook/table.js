import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap/lib';
// import styles from './table.css';

class CustomTable extends Component {

  render() {

    return (
      <Table striped hover responsive>
        <thead>
        <tr>
          <th>Assignment</th>
          <th>Submitted</th>
          <th>Due date</th>
          <th>Grade</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Assignment I</td>
          <td>Apr 18, 2016 7:19 PM</td>
          <td>Mar 01, 2016 00:00 AM</td>
          <td>70%</td>
        </tr>
        <tr>
          <td>Assignment II</td>
          <td>Apr 18, 2016 7:19 PM</td>
          <td>Mar 01, 2016 00:00 AM</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>Assignment III</td>
          <td>Apr 18, 2016 7:19 PM</td>
          <td>Mar 01, 2016 00:00 AM</td>
          <td>90%</td>
        </tr>
        <tr>
          <td>Assignment IV</td>
          <td>Apr 18, 2016 7:19 PMl</td>
          <td>Mar 01, 2016 00:00 AM</td>
          <td>84%</td>
        </tr>
        </tbody>
      </Table>
    )
  }
}

export default (CustomTable);
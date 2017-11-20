import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import styles from './stats-table.css';
import { isDev } from '../../util/env-mode';
import { userColumn, portraitColumn } from './table-columns';

class StatsTable extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  };

  render() {
    const { type } = this.props;

    const columnsHeading = type === 'user' ? userColumn : portraitColumn;
    const tableBody = this.generateBody();

    return (
      <div className={`${styles.table} ${type === 'portrait' ? styles.portraitTable : ''}`}>
        <Table responsive striped bordered condensed hover>
          <thead>
          <tr>
            {columnsHeading.map((column) => <th key={column}>{column}</th>)}
          </tr>
          </thead>
          <tbody>
          {tableBody}
          </tbody>
        </Table>
      </div>
    )
  }

  generateBody = () => {
    const { type, data } = this.props;
    const emailStyles = isDev() ? styles.email : styles.blurText;

    switch (type) {
      case "user":
        return data.map((user) => {
            return (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td className={emailStyles}>{user.email}</td>
                <td>{moment(user.registered_at).format('DD/MM/YYYY')}</td>
                <td>{user.feedback}</td>
              </tr>
            )
          });
      default:
        return data.map((landmark) => {
          const discard = parseInt(landmark.not_applicable, 10);
          return (
            <tr className={discard ? styles.discarded : styles.normal} key={landmark.portrait_id}>
              <td>{landmark.portrait_id}</td>
              <td>{landmark.EB_FLAT_SHAPED}</td>
              <td>{landmark.EB_ANGLED}</td>
              <td>{landmark.EB_ROUNDED}</td>
              <td>{landmark.EYE_MONOLID_ALMOND}</td>
              <td>{landmark.EYE_DEEP_SET}</td>
              <td>{landmark.EYE_DOWNTURNED}</td>
              <td>{landmark.EYE_HOODED}</td>
              <td>{landmark.NOSE_AQUILINE}</td>
              <td>{landmark.NOSE_FLAT}</td>
              <td>{landmark.NOSE_ROMAN_HOOKED}</td>
              <td>{landmark.NOSE_SNUB}</td>
              <td>{landmark.gender}</td>
              <td>{landmark.mustache}</td>
              <td>{landmark.beard}</td>
              <td>{moment(landmark.date_completed).format('DD/MM/YYYY')}</td>
            </tr>
          )
        });
    }
  }

}

export default connect()(StatsTable);

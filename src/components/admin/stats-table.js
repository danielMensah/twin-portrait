import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import moment from 'moment';

class StatsTable extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  };

  render() {
    const { type } = this.props;

    const heading = type === 'user' ? ['User id', 'E-mail', 'Date registered', 'Feedback']
      : ['Id', 'Flat eyebrows', 'Angled eyebrows', 'Rounded eyebrows', 'Monolid/Almond eye', 'Deep-set eye', 'Downturned eye', 'Hooded eye', 'Aquiline nose', 'Flat nose', 'Roman/Hooked nose', 'Snub nose', 'Discarded', 'Gender', 'Mustache', 'Beard', 'Completed', 'Date Completed'];
    const tableBody = this.generateBody();

    return (
      <div>
        <Table responsive striped bordered condensed hover>
          <thead>
          <tr>
            {heading.map((heading) => <th key={heading}>{heading}</th>)}
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

    switch (type) {
      case "user":
        return data.map((user) => {
            return (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.email}</td>
                <td>{moment(user.registered_at).format('DD/MM/YYYY')}</td>
                <td>{user.feedback}</td>
              </tr>
            )
          });
      default:
        return data.map((landmark) => {
          return (
            <tr key={landmark.portrait_id}>
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
              <td>{landmark.not_applicable}</td>
              <td>{landmark.gender}</td>
              <td>{landmark.mustache}</td>
              <td>{landmark.beard}</td>
              <td>{landmark.features_completed}</td>
              <td>{moment(landmark.date_completed).format('DD/MM/YYYY')}</td>
            </tr>
          )
        });
    }
  }

}

export default connect()(StatsTable);

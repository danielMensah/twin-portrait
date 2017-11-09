import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

class StatsTable extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  };

  render() {
    const { type } = this.props;

    const heading = type === 'user' ? ['User id', 'E-mail', 'Date registered', 'Feedback']
      : ['Id', 'Flat eyebrows', 'Angled eyebrows', 'Rounded eyebrows', 'Monolid/Almond eye', 'Deep-set eye', 'Downturned eye', 'Hooded eye'];
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
        return data.users.map((user) => {
            return (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.date_registered}</td>
                <td>{user.feedback}</td>
              </tr>
            )
          });
      default:
        return data.landmarks.map((landmark) => {
          return (
            <tr key={landmark.portrait_id}>
              <td>{landmark}</td>
            </tr>
          )
        });
    }
  }

}

export default connect()(StatsTable);

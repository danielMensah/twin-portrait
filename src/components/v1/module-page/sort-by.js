import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap/lib';
import styles from './sort-by.css';

class SortBy extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      dropdownTitle: 'None',
    }
  }

  render() {
    const { dropdownTitle } = this.state;

    return (
      <div className={styles.sortBy}>
        <div className={styles.label}>Sort by </div>
        <DropdownButton className={styles.dropdown} onSelect={this.handleOnSelect}
                        title={dropdownTitle} key="sortBy" id={`dropdown-basic-sortBy`}>
          <MenuItem id="None" eventKey="1">None</MenuItem>
          <MenuItem id="Date" eventKey="1">Date</MenuItem>
          <MenuItem id="Nearest deadline" eventKey="2">Nearest deadline</MenuItem>
        </DropdownButton>
      </div>
    )
  }

  handleOnSelect = (event, eventKey) => {
    this.setState({ dropdownTitle: eventKey.target.id})
  }
}

export default (SortBy);
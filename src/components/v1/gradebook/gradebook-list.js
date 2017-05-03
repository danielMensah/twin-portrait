import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Panel, FormGroup, FormControl, Col, Button, ButtonGroup } from 'react-bootstrap/lib';
import CustomTable from './table';
import styles from './gradebook-list.css';

class GradeTable extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      searchValue: ''
    }
  }

  render() {
    const { searchValue } = this.state;
    const searchIcon = searchValue ? 'times' : 'search';
    const searchClass = searchValue ? styles.clearSearch : styles.search;

    return (
      <Panel className={styles.panel} header="System Environment">
        <FormGroup>
          <Col className={styles.col} sm={6}>
            <FormControl onChange={this.handleOnChange} value={searchValue} type="text" placeholder="Search assignment..." />
            <FontAwesome title="Clear search" onClick={this.clearSearch} className={searchClass} name={searchIcon}/>
          </Col>
          <ButtonGroup className={styles.btnGroup}>
            <Button title="Export table as CVS">CVS</Button>
            <Button title="Export table as PDF">PDF</Button>
            <Button onClick={this.handlePrint} title="Print table">Print</Button>
          </ButtonGroup>
        </FormGroup>
        <CustomTable />
      </Panel>
    )
  }

  handlePrint() {
    window.print();
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value })
  };

  clearSearch = () => {
    this.setState({ searchValue: '' })
  }
}

export default (GradeTable);
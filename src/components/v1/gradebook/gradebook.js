import React, { Component } from 'react';
import GradeTable from './gradebook-list';
import GradeTotalWidget from './grade-total-widget';
import Header from '../header';
import styles from './gradebook.css'

class Gradebook extends Component {

  render() {

    return (
      <div>
        <Header pageTitle="Gradebook" />
        <div className={styles.content}>
          <GradeTable />
          <GradeTotalWidget />
        </div>
      </div>
    )
  }
}

export default (Gradebook);
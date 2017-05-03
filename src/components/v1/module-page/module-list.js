import React, { Component } from 'react';
import Header from '../header';
import styles from './module-list.css';
import ModuleListItem from './module-list-item'

class ModuleList extends Component {

  render() {

    return (
      <div className={styles.modulesContainer}>
        <Header pageTitle="Modules" subTitle="Here are the list of all modules" />
        <div className={styles.content}>
          <ModuleListItem />
        </div>
      </div>
    )
  }
}

export default (ModuleList);
import React, { Component } from 'react'
import styles from './popover-content.css'
import UserIcon from '../navbar/user-icon'
import FontAwesome from 'react-fontawesome'

class PopoverContent extends Component {

  render() {
    
    return (
      <a href="#">
        <UserIcon />
        <div className={styles.notificationDetails}>
          <span className={styles.header}>
            <FontAwesome name='copy'/>
            <span className={styles.time}>2 hours ago</span>
          </span>
          <span className={styles.main}>
            <span className={styles.content}>Daniel O Mensah has made a new announcement</span>
            <span className={styles.footer}> - Programming II</span>
          </span>
        </div>
      </a>
    )
  }
}
export default (PopoverContent)

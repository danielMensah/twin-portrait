import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './home.css';
import { Image, Button } from 'react-bootstrap/lib';
import Compare from '../images/comparison.jpg';
import { browserHistory } from 'react-router';

class Home extends Component {

  render() {

    return (
      <div>
        <div className={styles.firstHalf}>
          <div className={styles.header}>
            <div className={styles.tptext}>Twin Portrait</div>
            <div className={styles.text1}>Find your Doppelgänger within 1000+ portraits</div>
            <div className={styles.comingSoon}>Coming Soon!</div>
            <Image className={styles.compare} src={Compare} rounded/>
          </div>
          <div className={styles.buttonDiv}>
            <Button onClick={this.startNow} className={styles.startNow} bsSize="large">Start now</Button>
          </div>
        </div>
        <div className={styles.secondHalf}>
          <div className={styles.text2}>
            Help us to create an accurate matching system and in return you will be able to use Twin Portrait
            for free after it's launched! Start now and you will be taken through what needs to be done!
          </div>
        </div>
      </div>
    )
  }

  startNow = () => {
    browserHistory.push('/matchPortrait')
  }

}

export default connect()(Home);

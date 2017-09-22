import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './home.css';
import { Image, Button, ControlLabel } from 'react-bootstrap/lib';
import Compare from '../images/comparison.jpg';
import { browserHistory } from 'react-router';
import rotateLandscape from '../images/rotate_landscape.gif';

class Home extends Component {

  render() {

    return (
      <div>
        <div className={styles.turnLandscape}>
          <Image className={styles.rotateLandscape} src={rotateLandscape}/>
          <span>Rotate your device to landscape</span>
        </div>
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
          <ControlLabel className={styles.controlLabel}>What is Twin Portrait</ControlLabel>
          <p>
            Twin Portrait is a website created to incite people to learn more about Arts & Culture and to find their
            Doppelgängers through portraits. This will help individuals to have a deeper understanding
            regarding Arts & Culture and be encouraged to visit some of the best museums in the world.
          </p>
          <ControlLabel className={styles.controlLabel}>About me: Daniel Mensah</ControlLabel>
          <p>
            Daniel Mensah studies Software Engineering including sandwich year at Kingston University. Born in Italy from Ghanaian parents,
            he moved to London in the 2010 to pursuit his career of becoming a Software Engineer. Daniel worked as a Software Developer
            at Hindsight Software for his one year placement. He managed to learn and absorb most teachings regarding software development
            and business management and looking forward to apply his knowledge with this project.
          </p>
          <ControlLabel className={styles.controlLabel}>How it works</ControlLabel>
          <p>
            Twin Portrait isn't launched yet and it needs your help. Help to create an accurate matching system and
            in return you will be able to use Twin Portrait for free after it's launched! What do you have to do?
            Few portraits will be displayed and you need to select the appropriate facial features for each one of them.
            Simple isn't it? At the end of it, you will receive a promo code that will allow you to use Twin Portrait
            for free for life. <b>Start now!</b>
          </p>
        </div>
      </div>
    )
  }

  startNow = () => {
    browserHistory.push('/match-portrait')
  }

}

export default connect()(Home);

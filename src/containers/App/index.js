import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './app.css';
import {Image, Button} from 'react-bootstrap/lib';
import avatar from '../../images/portraits/test.jpg'
import avatar2 from '../../images/portraits/test2.jpg'
import avatar3 from '../../images/portraits/test3.jpg'
import avatar4 from '../../images/portraits/test4.jpg'
import avatar5 from '../../images/portraits/test5.jpg'
import avatar6 from '../../images/portraits/test6.jpg'
import avatar7 from '../../images/portraits/test7.jpg'
import avatar8 from '../../images/portraits/test8.jpg'
import avatar9 from '../../images/portraits/test9.jpg'
import avatar10 from '../../images/portraits/test10.jpg'
import LandmarksField from '../../landmark/landmarks-field';

const images = [avatar, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10];

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      page: 0
    }
  }

  componentDidMount() {

    // setTimeout(() => {
    //   const width = document.getElementById('avatar').clientWidth;
    //   document.getElementById('portraits').style.width= `${width+50}px`;
    // }, 100);

  }

  render() {
    const {page} = this.state;
    const currentPage = page+1;

    return (
      <div id="app-container" className={styles.appContainer}>
        <div className={styles.container}>
          <div id="portraits" className={styles.portraits}>
            <span className={styles.helper}>
              <Image id="avatar" src={images[page]}/>
              { page > 8 ?
                <Button className={styles.submit} bsSize="large" bsStyle="success">Submit</Button> :
                <div className={styles.buttons}>
                  <Button bsSize="large" bsStyle="primary" onClick={this.movePage}>Next ({currentPage}/10)</Button>
                  <Button bsSize="large" bsStyle="danger" onClick={this.movePage}>Not Applicable</Button>
                </div>}
            </span>
          </div>
          <div className={styles.landmarks}>
            <LandmarksField/>
          </div>
        </div>
      </div>
    )
  }

  movePage = () => {
    this.setState({page: this.state.page+1});
    console.log(this.state.page)
  }

}

export default connect()(App);

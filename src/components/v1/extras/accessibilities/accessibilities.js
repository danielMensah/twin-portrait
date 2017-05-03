import React, { Component } from 'react';
import styles from './accessibilities.css';
import { Button} from 'react-bootstrap/lib'
import FontAwesome from 'react-fontawesome';

class Accessibilities extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      currZoom: 100
    }
  }

  render() {

    return (
      <div className={styles.accessibilities}>
        <Button onClick={() => this.zoomFunction('zoomIn')} className={styles.zoomIn}>
          Zoom In
          <FontAwesome className={styles.icon} name='search-plus'/>
        </Button>
        <Button onClick={() => this.zoomFunction('zoomOut')} className={styles.zoomOut}>
          Zoom Out
          <FontAwesome className={styles.icon} name='search-minus'/>
        </Button>
        <Button onClick={() => this.zoomFunction('reset')} className={styles.zoomReset}>
          <FontAwesome className={styles.resetIcon} name='repeat'/>
        </Button>
      </div>
    )
  }

  zoomFunction = (action) => {
    const { currZoom } = this.state;

    switch(action) {
      case 'zoomIn':
        this.setState({ currZoom: currZoom + 2},() => this.zoomAction(this.state.currZoom));
        break;
      case 'zoomOut':
        this.setState({ currZoom: currZoom - 2},() => this.zoomAction(this.state.currZoom));
        break;
      default:
        this.setState({ currZoom: 100},() => this.zoomAction(this.state.currZoom));
    }
  };

  zoomAction(currZoom) {
    if (/firefox/i.test(navigator.userAgent)) {
      document.body.style.mozTransform = `scale(${currZoom})`
    } else {
      document.body.style.zoom =  currZoom + '%';
    }
  }

}


export default (Accessibilities);
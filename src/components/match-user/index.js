import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { AppBar, MuiThemeProvider, MenuItem, Menu } from 'material-ui';
import styles from './styles.css';
import Main from './main';
// import { Button } from 'react-bootstrap/lib';
// import FontAwesome from 'react-fontawesome';

class UserMatch extends Component {

  componentDidMount() {
    document.getElementById('root').firstChild.style.textAlign = 'center';
  }

  // static propTypes = {
  // };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {
    const navigationMenu = <Menu className={styles.menu}>
      <MenuItem primaryText="Home"/>
      <MenuItem primaryText="About"/>
      <MenuItem primaryText="Explore"/>
      <MenuItem primaryText="Help"/>
    </Menu>;

    return (
      <MuiThemeProvider styles={{textAlign: 'center'}}>
        <div>
          <AppBar
            className={styles.appBar}
            showMenuIconButton={false}
            title={<span className={styles.title}>Twin Portrait <span className={styles.subTitle}>Interactive Art</span></span>}
            iconElementRight={navigationMenu}
          />
          <div className={styles.headerContainer}>
            <h1 className={styles.header}>Find Doppelgänger</h1>
            <div className={styles.subHeader}>Order each landmark from the most applicable to the least</div>
          </div>
          <Main/>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect()(UserMatch);

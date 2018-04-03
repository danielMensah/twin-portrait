import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import { AppBar, MenuItem, Menu } from 'material-ui';
import styles from './styles.css';

class Header extends Component {

  componentDidMount() {
    document.getElementById('root').firstChild.style.textAlign = 'center';
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 }
  }

  render() {
    const { title, subtitle } = this.props;
    const { navigate } = this;
    const navigationMenu = <Menu className={styles.menu}>
      <MenuItem onClick={() => navigate('/')} primaryText="Home"/>
      <MenuItem onClick={() => navigate('/match-portrait')} primaryText="Annotate Portrait"/>
      <MenuItem onClick={() => navigate('/match-user')} primaryText="Find Doppelganger"/>
      <MenuItem primaryText="Explore"/>
      <MenuItem primaryText="Help"/>
    </Menu>;

    return (
      <div>
        <AppBar
          className={styles.appBar}
          showMenuIconButton={false}
          onTitleClick={() => this.navigate('/')}
          title={<span className={styles.title}>Twin Portrait <span className={styles.subTitle}>Interactive Art</span></span>}
          iconElementRight={navigationMenu}
        />
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>{title}</h1>
          <div className={styles.subHeader}>{subtitle}</div>
        </div>
      </div>
    )
  }

  navigate = (location) => {
    browserHistory.push(location);
  }

}

export default connect()(Header);
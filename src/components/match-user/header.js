import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    const navigationMenu = <Menu className={styles.menu}>
      <MenuItem primaryText="Home"/>
      <MenuItem primaryText="About"/>
      <MenuItem primaryText="Explore"/>
      <MenuItem primaryText="Help"/>
    </Menu>;

    return (
      <div>
        <AppBar
          className={styles.appBar}
          showMenuIconButton={false}
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

}

export default connect()(Header);
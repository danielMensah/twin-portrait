import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import { Button, Panel } from 'react-bootstrap/lib';
import styles from './quick-filters.css';

class QuickFilters extends Component {

  static propTypes = {
    quickFilter: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired
    })),
    enableFilter: PropTypes.func.isRequired,
    disableFilter: PropTypes.func.isRequired
  };

  render() {
    const { quickFilter } = this.props;

    return (
      <Panel className={styles.filterContainer}>
        <span className={styles.quickFiltersLabel}>Filters: </span>
        <div className={styles.filters}>
          {quickFilter.map((filter, index) => (
            <Button key={uniqueId(filter.label)} className={`${styles.button} ${filter.active ? styles.active : ''}`}
                    onClick={this.handleFilter.bind(null, filter.active, index)}>
              {filter.label}
            </Button>
          ))}
        </div>
      </Panel>
    )
  }

  handleFilter = (active, index) => {
    const { enableFilter, disableFilter } = this.props;
    active ? disableFilter(index) : enableFilter(index);
  }
}

const mapStateToProps = ({ quickFilter }) => ({ quickFilter });
import { enableFilter, disableFilter } from '../../../../actions/quick-filter-action';
const mapDispatchToProps = (dispatch) => bindActionCreators({ disableFilter, enableFilter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuickFilters)

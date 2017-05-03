import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchActivities } from '../../../actions/activity-actions';
import Header from '../header';
import QuickFilter from './quick-filters/quick-filters';
import SortBy from './sort-by';
import ActivityCard from './activity-card'
import styles from './module.css';
import { uniqueId, includes } from 'lodash';

class Module extends Component {

  componentWillMount() {
    this.props.fetchActivities();
  }

  render() {
    const { module } = this.props.params;

    return (
      <div className={styles.moduleContainer}>
        <Header pageTitle={module} subTitle={`Module code: ${module}: 400`} />
        <div className={styles.content}>
          <div className={styles.filterHeader}>
            <QuickFilter />
            <SortBy />
          </div>
          <div className={styles.activityContent}>
            {this.generateActivities()}
          </div>
          <div className={styles.activityWidget}>

          </div>
        </div>
      </div>
    )
  }

  generateActivities() {
    const { filters, activities } = this.props;
    const activeFilters = filters.filter(filter => filter.active)
      .map(activeFilter => activeFilter.type); //filters all active filters and put them in activeFilters variable

    return activeFilters.length //checks if there's any any filter active.
      ? activities.filter(activity => includes(activeFilters, activity.type))
        .map((activity) => <ActivityCard {...activity} key={uniqueId(activity.type)}/>)//returns all activities depending on filter
      : activities.map((activity) => <ActivityCard {...activity} key={uniqueId(activity.type)}/>); // no filter is active so it returns all activities
  }
}

const mapStateProps = ({ activities, quickFilter}) => ({
  activities: activities.activities,
  filters: quickFilter
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchActivities }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Module);
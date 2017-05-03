import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWidgets } from '../../../actions/dashboard-actions';
import { fetchActivities } from '../../../actions/activity-actions';
import styles from './dashboard.css';
import ActivityCard from '../module-page/activity-card'
import WidgetCard from './widget-card';
import Header from '../header'
import { uniqueId } from 'lodash';

class Dashboard extends Component {

  componentWillMount() {
    this.props.fetchWidgets();
    this.props.fetchActivities();
  }

  render() {
    const { widgets, activities } = this.props;

    return (
      <div className={styles.dashboardContainer}>
        <Header pageTitle="Dashboard" subTitle="Welcome to Open Learning Environment Platform!" />
        <div className={styles.panelContent}>
          <div className={styles.activityPanel}>
            {activities.map(activity => {
              return <ActivityCard {...activity} key={uniqueId(activity.type)}/>
            })}
          </div>
          <div className={styles.widgetPanel}>
            {widgets.map(widget => {
              return <WidgetCard key={uniqueId(widget.type)} type={widget.type} title={widget.title} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateProps = ({dashboardWidgets, activities}) => ({
  widgets: dashboardWidgets.widgets,
  activities: activities.activities
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchWidgets, fetchActivities }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Dashboard);
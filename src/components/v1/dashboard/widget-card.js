import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import styles from './widget-card.css';
import { WIDGET } from './widget-type'

class WidgetCard extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  render() {
    const { title, type } = this.props;
    const Content = WIDGET[type];

    return (
    <Panel className={styles.card} header={title} bsStyle="info">
      <Content />
    </Panel>
    )
  }
}

export default (WidgetCard);
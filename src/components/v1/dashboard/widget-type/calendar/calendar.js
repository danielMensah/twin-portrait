import React, { Component } from 'react';
import DayPicker from "react-day-picker";
require("./style.scss");

function sundays(day) {
  return day.getDay() === 0;
}

class Calendar extends Component {

  constructor(prop) {
    super(prop);
    this.state = { selectedDay: new Date() };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  render() {
    const currentMonth = new Date().getMonth();

    return (
      <DayPicker
        initialMonth={ new Date(2017, currentMonth) }
        disabledDays={ sundays }
        selectedDays={ this.state.selectedDay }
        onDayClick={ this.handleDayClick } />
    )
  }

  handleDayClick(day, { disabled, selected }) {
    if (disabled) return;

    this.setState({
      selectedDay: selected ? null : day
    })
  }
}

export default (Calendar);
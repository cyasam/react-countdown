import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ReactCountdown extends Component {
  state = {
    total: 0,
    interval: null,
    days: 0,
    daysLabel: 'days',
    hours: 0,
    hoursLabel: 'hours',
    minutes: 0,
    minutesLabel: 'minutes',
    seconds: 0,
    secondsLabel: 'seconds',
    finished: false,
  };

  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  };

  componentDidMount() {
    this.tick();

    if (!this.state.finished) {
      this.setState({
        interval: this.setTimer(),
      });
    }
  }

  componentDidUpdate() {
    if (this.state.finished) {
      clearInterval(this.state.interval);
    }
  }

  tick() {
    const { date } = this.props;
    const startTimestamp = this.getStartTimestamp(date);

    const total = Math.max(
      0,
      ((startTimestamp - Date.now()) / 1000).toFixed(0),
    );

    if (total <= 0) {
      this.setState({
        finished: true,
      });
    }

    this.setState({
      total,
      days: Math.floor(total / (60 * 60 * 24)),
      hours: Math.floor((total / (60 * 60)) % 24),
      minutes: Math.floor((total / 60) % 60),
      seconds: Math.floor(total % 60),
    });
  }

  getStartTimestamp(date) {
    if (typeof date === 'string') {
      return new Date(date).getTime();
    }

    return date;
  }

  setTimer() {
    return setInterval(() => {
      this.tick();
    }, 1000);
  }

  renderChildren() {
    const {
      days,
      daysLabel,
      hours,
      hoursLabel,
      minutes,
      minutesLabel,
      seconds,
      secondsLabel,
    } = this.state;
    return `${days} ${daysLabel} ${hours} ${hoursLabel} ${minutes} ${minutesLabel} ${seconds} ${secondsLabel}`;
  }

  render() {
    const { days, hours, minutes, seconds, finished } = this.state;
    if (!this.props.children) {
      return this.renderChildren();
    }

    return (
      <>{this.props.children({ days, hours, minutes, seconds, finished })}</>
    );
  }
}

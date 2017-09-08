import cx from 'classnames';
import moment from 'moment';
import React from 'react';

import DateCalendar from './DateCalendar';
import DateMonths from './DateMonths';

import LeftIcon from 'react-icons/lib/fa/angle-left';
import RightIcon from 'react-icons/lib/fa/angle-right';
import DoubleLeftIcon from 'react-icons/lib/fa/angle-double-left';
import DoubleRightIcon from 'react-icons/lib/fa/angle-double-right';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'calendar',
    };
  }

  getMoment() {
    let mom = this.props.moment ? this.props.moment.clone() : moment();

    if (this.props.locale) {
      mom = mom.locale(this.props.locale);
    }

    return mom;
  }

  render() {
    let {mode} = this.state;
    let mom = this.getMoment();

    return (
      <div className={cx('im-date-picker', this.props.className)}>
        <Toolbar
          display={mom.format('MMMM YYYY')}
          onPrevMonth={this.onPrevMonth.bind(this)}
          onNextMonth={this.onNextMonth.bind(this)}
          onPrevYear={this.onPrevYear.bind(this)}
          onNextYear={this.onNextYear.bind(this)}
          onToggleMode={this.onToggleMode.bind(this)}
        />
        {mode === 'calendar' && <DateCalendar moment={mom} onDaySelect={this.onDaySelect.bind(this)}/>}
        {mode === 'months' && <DateMonths moment={mom} onMonthSelect={this.onMonthSelect.bind(this)}/>}
      </div>
    );
  }

  onPrevMonth(e) {
    e.preventDefault();
    let m = this.getMoment().clone();
    this.props.onChange(m.subtract(1, 'month'));
  }

  onNextMonth(e) {
    e.preventDefault();
    let m = this.getMoment().clone();
    this.props.onChange(m.add(1, 'month'));
  }

  onPrevYear(e) {
    e.preventDefault();
    let m = this.getMoment().clone();
    this.props.onChange(m.subtract(1, 'year'));
  }

  onNextYear(e) {
    e.preventDefault();
    let m = this.getMoment().clone();
    this.props.onChange(m.add(1, 'year'));
  }

  onToggleMode() {
    this.setState({
      mode: this.state.mode === 'calendar' ? 'months' : 'calendar',
    });
  }

  onDaySelect(day, week) {
    let mom = this.props.moment.clone();
    let prevMonth = (week === 0 && day > 7);
    let nextMonth = (week >= 4 && day <= 14);

    mom.date(day);
    if (prevMonth) mom.subtract(1, 'month');
    if (nextMonth) mom.add(1, 'month');
    this.props.onChange(mom);
  }

  onMonthSelect(month) {
    let mom = this.props.moment.clone();
    this.setState({mode: 'calendar'}, () => this.props.onChange(mom.month(month)));
  }
}

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="toolbar">
        <DoubleLeftIcon
          className="prev-nav"
          onClick={this.props.onPrevYear}
        />
        <LeftIcon
          className="prev-nav"
          onClick={this.props.onPrevMonth}
        />
        <span
          className="current-date"
          onClick={this.props.onToggleMode}>
          {this.props.display}
        </span>
        <RightIcon
          className="next-nav"
          onClick={this.props.onNextMonth}
        />
        <DoubleRightIcon
          className="next-nav"
          onClick={this.props.onNextYear}
        />
      </div>
    );
  }
}

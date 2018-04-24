import cx from 'classnames';
import React from 'react';

import DateCalendarRange from './shared/DateCalendarRange';
import DateMonths from './shared/DateMonths';

import LeftIcon from 'react-icons/lib/fa/angle-left';
import RightIcon from 'react-icons/lib/fa/angle-right';
import DoubleLeftIcon from 'react-icons/lib/fa/angle-double-left';
import DoubleRightIcon from 'react-icons/lib/fa/angle-double-right';

//moment range
import Moment from 'moment';
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'calendar',
    };
  }

  render() {
    let {mode} = this.state;
    let range = this.props.range.clone();

    return (
      <div className={cx('im-date-picker', this.props.className)}>
        <Toolbar
          display={range.start.format('MMMM YYYY')}
          onPrevMonth={this.onPrevMonth.bind(this)}
          onNextMonth={this.onNextMonth.bind(this)}
          onPrevYear={this.onPrevYear.bind(this)}
          onNextYear={this.onNextYear.bind(this)}
          onToggleMode={this.onToggleMode.bind(this)}
        />
        {mode === 'calendar' && <DateCalendarRange range={range} onDaySelect={this.onDaySelect.bind(this)}/>}
        {mode === 'months' && <DateMonths moment={range.start} onMonthSelect={this.onMonthSelect.bind(this)}/>}
      </div>
    );
  }

  onPrevMonth(e) {
    e.preventDefault();
    let range = this.props.range.clone();
    range.start.subtract(1, 'month');
    range.end.subtract(1, 'month');
    this.props.onChange(range);
  }

  onNextMonth(e) {
    e.preventDefault();
    let range = this.props.range.clone();
    range.start.add(1, 'month');
    range.end.add(1, 'month');
    this.props.onChange(range);
  }

  onPrevYear(e) {
    e.preventDefault();
    let range = this.props.range.clone();
    range.start.subtract(1, 'year');
    range.end.subtract(1, 'year');
    this.props.onChange(range);
  }

  onNextYear(e) {
    e.preventDefault();
    let range = this.props.range.clone();
    range.start.add(1, 'year');
    range.end.add(1, 'year');
    this.props.onChange(range);
  }

  onToggleMode() {
    this.setState({
      mode: this.state.mode === 'calendar' ? 'months' : 'calendar',
    });
  }

  onDaySelect(day, week) {
    let range = this.props.range.clone();
    let start = range.start;
    let end = range.end;

    let prevMonth = (week === 0 && day > 7);
    let nextMonth = (week >= 4 && day <= 14);

    let compute = start.clone();
    if (prevMonth) compute.subtract(1, 'month');
    if (nextMonth) compute.add(1, 'month');
    compute.date(day);

    let newRange;
    //begin new range select
    if (start.date() !== end.date()) {
      newRange = moment.range(compute, compute);
    }
    //2nd date in range select
    else {
      if (compute.valueOf() <= start.valueOf()) {
        newRange = moment.range(compute, end);
      } else {
        newRange = moment.range(start, compute);
      }
    }

    this.props.onChange(newRange);
  }

  onMonthSelect(month) {
    let mom = moment().date(1).month(month);
    this.setState({mode: 'calendar'}, () => this.props.onChange(moment.range(mom.clone(), mom.clone())));
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

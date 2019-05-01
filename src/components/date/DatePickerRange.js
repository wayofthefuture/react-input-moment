import cx from 'classnames';
import moment from 'moment';
import React from 'react';

import DateCalendarRange from './shared/DateCalendarRange';
import DateMonths from './shared/DateMonths';

import LeftIcon from 'react-icons/lib/fa/angle-left';
import RightIcon from 'react-icons/lib/fa/angle-right';
import DoubleLeftIcon from 'react-icons/lib/fa/angle-double-left';
import DoubleRightIcon from 'react-icons/lib/fa/angle-double-right';

export default class extends React.Component {
  constructor(props) {
    super(props);
    let {startMoment, endMoment} = this.props;
    let displayMoment = startMoment.clone();

    this.state = {
      mode: 'calendar',
      displayMoment: displayMoment,
      startMoment: startMoment,
      endMoment: endMoment
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.startMoment !== nextProps.startMoment) {
      this.setState({startMoment: nextProps.startMoment});
    }
    if (this.state.endMoment !== nextProps.endMoment) {
      this.setState({endMoment: nextProps.endMoment});
    }
  }

  render() {
    let {mode, displayMoment, startMoment, endMoment} = this.state;

    return (
      <div className={cx('im-date-picker', this.props.className)}>
        <Toolbar
          display={displayMoment.format('MMMM YYYY')}
          onPrevMonth={this.onPrevMonth.bind(this)}
          onNextMonth={this.onNextMonth.bind(this)}
          onPrevYear={this.onPrevYear.bind(this)}
          onNextYear={this.onNextYear.bind(this)}
          onToggleMode={this.onToggleMode.bind(this)}
        />
        {mode === 'calendar' && <DateCalendarRange displayMoment={displayMoment} startMoment={startMoment} endMoment={endMoment} onDaySelect={this.onDaySelect.bind(this)}/>}
        {mode === 'months' && <DateMonths moment={displayMoment} onMonthSelect={this.onMonthSelect.bind(this)}/>}
      </div>
    );
  }

  onPrevMonth(e) {
    e.preventDefault();
    let displayMoment = this.state.displayMoment.clone();
    displayMoment.subtract(1, 'month');
    this.setState({displayMoment});
  }

  onNextMonth(e) {
    e.preventDefault();
    let displayMoment = this.state.displayMoment.clone();
    displayMoment.add(1, 'month');
    this.setState({displayMoment});
  }

  onPrevYear(e) {
    e.preventDefault();
    let displayMoment = this.state.displayMoment.clone();
    displayMoment.subtract(1, 'year');
    this.setState({displayMoment});
  }

  onNextYear(e) {
    e.preventDefault();
    let displayMoment = this.state.displayMoment.clone();
    displayMoment.add(1, 'year');
    this.setState({displayMoment});
  }

  onToggleMode() {
    this.setState({
      mode: this.state.mode === 'calendar' ? 'months' : 'calendar',
    });
  }

  onDaySelect(day, week) {
    let displayMoment = this.state.displayMoment.clone();
    let startMoment = this.state.startMoment.clone();
    let endMoment = this.state.endMoment.clone();

    let prevMonth = (week === 0 && day > 7);
    let nextMonth = (week >= 4 && day <= 14);

    let compMoment = displayMoment.clone();
    if (prevMonth) compMoment.subtract(1, 'month');
    if (nextMonth) compMoment.add(1, 'month');
    compMoment.date(day);

    //begin new range select
    if (startMoment.date() !== endMoment.date()) {
      this.fireChangeEvent(compMoment, compMoment);
    }
    //2nd date in range select
    else {
      if (compMoment.valueOf() <= startMoment.valueOf()) {
        this.fireChangeEvent(compMoment, endMoment);
      } else {
        this.fireChangeEvent(startMoment, compMoment);
      }
    }
  }

  onMonthSelect(month) {
    let displayMoment = this.state.displayMoment.clone();
    let newMoment = displayMoment.clone().date(1).month(month);

    this.setState({mode: 'calendar', displayMoment: newMoment});
  }

  //make sure change event sends range moment boundaries
  fireChangeEvent(startMoment, endMoment) {
    //sometimes moments are same instance, so must clone
    this.props.onChange(startMoment.clone().startOf('day'), endMoment.clone().endOf('day'));
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

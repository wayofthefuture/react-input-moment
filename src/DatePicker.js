import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import range from 'lodash/utility/range';
import chunk from 'lodash/array/chunk';

import DatePickerToolbar from './DatePickerToolbar';
import DatePickerScoper from './DatePickerScoper';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'DatePicker';

    this.state = {
      mode: 'date'
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
    let mom = this.getMoment();
    let content;

    if (this.state.mode === 'scope') {
      content = (
        <DatePickerScoper
          moment={mom}
          onComplete={this.onScopeComplete.bind(this)}
        />
      );
    } else {
      let current = mom.date();
      let firstDayOfWeek = mom.localeData().firstDayOfWeek();
      let endOfPreviousMonth = mom.clone().subtract(1, 'month').endOf('month').date();
      let startDayOfCurrentMonth = mom.clone().date(1).day();
      let endOfCurrentMonth = mom.clone().endOf('month').date();

      let days = [].concat(
        range(
          (endOfPreviousMonth - startDayOfCurrentMonth + firstDayOfWeek + 1),
          (endOfPreviousMonth + 1)
        ),
        range(
          1,
          (endOfCurrentMonth + 1)
        ),
        range(
          1,
          (42 - endOfCurrentMonth - startDayOfCurrentMonth + firstDayOfWeek + 1)
        )
      );

      let weeks = mom.localeData().weekdaysShort();
      weeks = weeks.slice(firstDayOfWeek).concat(weeks.slice(0, firstDayOfWeek));

      content = (
        <div>
          <DatePickerToolbar
            display={mom.format('MMMM YYYY')}
            onPreviousMonth={this.prevMonth.bind(this)}
            onNextMonth={this.nextMonth.bind(this)}
            onPreviousYear={this.prevYear.bind(this)}
            onNextYear={this.nextYear.bind(this)}
            onScope={this.onScopeChange.bind(this)}
          />

          <table>
            <thead>
              <tr>
                {weeks.map((w, i) => <td key={i}>{w}</td>)}
              </tr>
            </thead>

            <tbody>
              {chunk(days, 7).map((row, w) => (
                <tr key={w}>
                  {row.map((i) => (
                    <Day key={i} i={i} d={current} w={w}
                      onClick={this.selectDate.bind(this, i, w)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className={cx('im-date-picker', this.props.className)}>
        {content}
      </div>
    );
  }

  onScopeChange(e) {
    this.setState({
      mode: 'scope',
    });
  }

  onScopeComplete(m) {
    this.setState({
      mode: 'date',
    }, () => { this.props.onChange(m); });
  }

  selectDate(i, w) {
    let m = this.getMoment();
    let prevMonth = (w === 0 && i > 7);
    let nextMonth = (w >= 4 && i <= 14);

    m.date(i);
    if(prevMonth) m.subtract(1, 'month');
    if(nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  }

  prevMonth(e) {
    e.preventDefault();
    let m = this.getMoment();
    this.props.onChange(m.subtract(1, 'month'));
  }

  nextMonth(e) {
    e.preventDefault();
    let m = this.getMoment();
    this.props.onChange(m.add(1, 'month'));
  }

  prevYear(e) {
    e.preventDefault();
    let m = this.getMoment();
    this.props.onChange(m.subtract(1, 'year'));
  }

  nextYear(e) {
    e.preventDefault();
    let m = this.getMoment();
    this.props.onChange(m.add(1, 'year'));
  }
}


class Day extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Day';
  }

  render() {
    let i = this.props.i;
    let w = this.props.w;
    let prevMonth = (w === 0 && i > 7);
    let nextMonth = (w >= 4 && i <= 14);
    let cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current': !prevMonth && !nextMonth && (i === this.props.d)
    });

    return <td className={cn} onClick={this.props.onClick}>{i}</td>;
  }
}

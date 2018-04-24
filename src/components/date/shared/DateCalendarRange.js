import cx from 'classnames';
import React from 'react';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let startMoment = this.props.startMoment.clone();
    let endMoment = this.props.endMoment.clone();

    let firstDayOfWeek = startMoment.localeData().firstDayOfWeek();
    let endOfPreviousMonth = startMoment.clone().subtract(1, 'month').endOf('month').date();
    let startDayOfCurrentMonth = startMoment.clone().date(1).day();
    let endOfCurrentMonth = startMoment.clone().endOf('month').date();

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

    let weeks = startMoment.localeData().weekdaysShort();
    weeks = weeks.slice(firstDayOfWeek).concat(weeks.slice(0, firstDayOfWeek));

    return (
      <table>
        <thead>
        <tr>
          {weeks.map((week, index) => <td key={index}>{week}</td>)}
        </tr>
        </thead>

        <tbody>
        {chunk(days, 7).map((row, week) => (
          <tr key={week}>
            {row.map(day => (
              <Day key={day} day={day} week={week} startMoment={startMoment} endMoment={endMoment} onClick={() => this.props.onDaySelect(day, week)}/>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {day, week} = this.props;
    let startMoment = this.props.startMoment.clone();
    let endMoment = this.props.endMoment.clone();

    let prevMonth = (week === 0 && day > 7);
    let nextMonth = (week >= 4 && day <= 14);

    let compMoment = startMoment.clone();
    if (prevMonth) compMoment.subtract(1, 'month');
    if (nextMonth) compMoment.add(1, 'month');
    compMoment.date(day);

    let cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current': (startMoment.valueOf() <= compMoment.valueOf() && compMoment.valueOf() <= endMoment.valueOf())
    });

    return <td className={cn} onClick={this.props.onClick}>{day}</td>;
  }
}

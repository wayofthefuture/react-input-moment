import cx from 'classnames';
import React from 'react';
import _range from 'lodash/range';
import _chunk from 'lodash/chunk';

//moment range
import Moment from 'moment';
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let range = this.props.range.clone();
    let mom = range.start;

    let firstDayOfWeek = mom.localeData().firstDayOfWeek();
    let endOfPreviousMonth = mom.clone().subtract(1, 'month').endOf('month').date();
    let startDayOfCurrentMonth = mom.clone().date(1).day();
    let endOfCurrentMonth = mom.clone().endOf('month').date();

    let days = [].concat(
      _range(
        (endOfPreviousMonth - startDayOfCurrentMonth + firstDayOfWeek + 1),
        (endOfPreviousMonth + 1)
      ),
      _range(
        1,
        (endOfCurrentMonth + 1)
      ),
      _range(
        1,
        (42 - endOfCurrentMonth - startDayOfCurrentMonth + firstDayOfWeek + 1)
      )
    );

    let weeks = mom.localeData().weekdaysShort();
    weeks = weeks.slice(firstDayOfWeek).concat(weeks.slice(0, firstDayOfWeek));

    return (
      <table>
        <thead>
        <tr>
          {weeks.map((week, index) => <td key={index}>{week}</td>)}
        </tr>
        </thead>

        <tbody>
        {_chunk(days, 7).map((row, week) => (
          <tr key={week}>
            {row.map(day => (
              <Day key={day} day={day} range={range} week={week} onClick={() => this.props.onDaySelect(day, week)}/>
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
    let {day, week, range} = this.props;

    let prevMonth = (week === 0 && day > 7);
    let nextMonth = (week >= 4 && day <= 14);

    let compute = range.start.clone();
    if (prevMonth) compute.subtract(1, 'month');
    if (nextMonth) compute.add(1, 'month');
    compute.date(day);

    let cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current': range.contains(compute)
    });

    return <td className={cn} onClick={this.props.onClick}>{day}</td>;
  }
}

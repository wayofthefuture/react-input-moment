import cx from 'classnames';
import React from 'react';
import range from 'lodash/utility/range';
import chunk from 'lodash/array/chunk';

import DatePickerToolbar from './DatePickerToolbar';

class YearOfMonths extends React.Component {
  render() {
    let months = this.props.moment.localeData().months();

    return (
      <div>
        <DatePickerToolbar
          display={this.props.moment.format('YYYY')}
          onPrevious={this.onPrevious.bind(this)}
          onNext={this.onNext.bind(this)}
          onScope={this.props.onScope}
          />
        <table>
          <tbody>
            {chunk(months, 3).map((row, ridx) => {
              return (
                <tr key={ridx}>
                  {row.map((month, midx) => {
                    let month_num = (ridx * 3) + midx;
                    return (
                      <td
                        key={midx}
                        className={cx({
                          current: this.props.moment.month() === month_num
                        })}
                        onClick={this.onSelect.bind(this, month_num)}>
                        {month}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  onSelect(month) {
    this.props.onComplete(this.props.moment.month(month));
  }

  onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'year'));
  }

  onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'year'));
  }
}


class DecadeOfYears extends React.Component {
  render() {
    let start = Math.floor(this.props.moment.year() / 10) * 10;
    let years = range(start, start + 10);

    return (
      <div>
        <DatePickerToolbar
          display={start + ' - ' + (start + 9)}
          onPrevious={this.onPrevious.bind(this)}
          onNext={this.onNext.bind(this)}
          onScope={this.props.onScope}
          />
        <table>
          <tbody>
            {chunk(years, 2).map((row, ridx) => {
              return (
                <tr key={ridx}>
                  {row.map((year, yidx) => {
                    return (
                      <td
                        key={yidx}
                        className={cx({
                          current: this.props.moment.year() === year
                        })}
                        onClick={this.onSelect.bind(this, year)}>
                        {year}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  onSelect(year) {
    this.props.onComplete(this.props.moment.year(year));
  }

  onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(10, 'year'));
  }

  onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(10, 'year'));
  }
}


class CenturyOfDecades extends React.Component {
  render() {
    let start = Math.floor(this.props.moment.year() / 100) * 100;
    let end = start + 99;
    let years = range(start, start + 100, 10);

    return (
      <div>
        <DatePickerToolbar
          display={start + ' - ' + end}
          onPrevious={this.onPrevious.bind(this)}
          onNext={this.onNext.bind(this)}
          onScope={this.props.onScope}
          />
        <table>
          <tbody>
            {chunk(years, 2).map((row, ridx) => {
              return (
                <tr key={ridx}>
                  {row.map((decade, yidx) => {
                    let decade_end = decade + 9;
                    return (
                      <td
                        key={yidx}
                        className={cx({
                          current: (this.props.moment.year() >= decade) && (this.props.moment.year() <= decade_end)
                        })}
                        onClick={this.onSelect.bind(this, decade)}>
                        {decade} - {decade_end}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  onSelect(year) {
    this.props.onComplete(this.props.moment.year(year));
  }

  onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(100, 'year'));
  }

  onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(100, 'year'));
  }
}


let SCOPE_PROGRESSION_UP = {
  'year': 'decade',
  'decade': 'century',
};

let SCOPE_PROGRESSION_DOWN = {
  'century': 'decade',
  'decade': 'year',
};

let SCOPE_CHOOSER = {
  'year': YearOfMonths,
  'decade': DecadeOfYears,
  'century': CenturyOfDecades,
};


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'DatePickerScoper';

    this.state = {
      mode: 'year',
      viewing: this.props.moment
    };
  }

  render() {
    let Chooser = SCOPE_CHOOSER[this.state.mode];
    return (
      <div>
        <Chooser
          moment={this.state.viewing}
          onChange={this.onChange.bind(this)}
          onScope={this.onScopeChange.bind(this)}
          onComplete={this.onScopeComplete.bind(this)}
          />
      </div>
    );
  }

  onChange(m) {
    this.setState({
      viewing: m,
    });
  }

  onScopeChange() {
    if (SCOPE_PROGRESSION_UP[this.state.mode]) {
      this.setState({
        mode: SCOPE_PROGRESSION_UP[this.state.mode],
      });
    }
  }

  onScopeComplete(m) {
    if (SCOPE_PROGRESSION_DOWN[this.state.mode]) {
      this.setState({
        mode: SCOPE_PROGRESSION_DOWN[this.state.mode],
        viewing: m,
      });
    } else {
      this.props.onComplete(m);
    }
  }
}

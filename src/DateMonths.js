import cx from 'classnames';
import React from 'react';
import chunk from 'lodash/chunk';

export default class extends React.Component {
  render() {
    let months = this.props.moment.localeData().months();

    return (
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
                    className={cx({current: this.props.moment.month() === month_num})}
                    onClick={() => this.props.onMonthSelect(month)}>
                    {month}
                  </td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

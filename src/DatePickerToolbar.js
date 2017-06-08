import React from 'react';
import LeftIcon from 'react-icons/lib/fa/angle-left';
import RightIcon from 'react-icons/lib/fa/angle-right';
import DoubleLeftIcon from 'react-icons/lib/fa/angle-double-left';
import DoubleRightIcon from 'react-icons/lib/fa/angle-double-right';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'DatePickerToolbar';
  }

  render() {
    return (
      <div className="toolbar">
        <DoubleLeftIcon
          className="nav prev"
          onClick={this.props.onPreviousYear}
        />
        <LeftIcon
          className="nav prev"
          onClick={this.props.onPreviousMonth}
        />
        <span
          className="current-date"
          onClick={this.props.onScope}>
          {this.props.display}
        </span>
        <DoubleRightIcon
          className="nav next"
          onClick={this.props.onNextYear}
        />
        <RightIcon
          className="nav next"
          onClick={this.props.onNextMonth}
        />
      </div>
    );
  }
}

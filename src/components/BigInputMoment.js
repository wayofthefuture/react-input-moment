import React from 'react';
import DatePicker from './date/DatePicker';
import TimeSlider from './time/TimeSlider';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mom = this.props.moment;

    return (
      <div className="im-big-input-moment">
        <div className="date-wrapper">
          <DatePicker
            moment={mom}
            locale={this.props.locale}
            onChange={this.props.onChange.bind(this)}
          />
        </div>
        <div className="time-wrapper">
          <TimeSlider
            moment={mom}
            xstep={this.props.xstep}
            locale={this.props.locale}
            onChange={this.props.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

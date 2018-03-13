import React from 'react';
import DatePicker from './sub/DatePicker';
import TimeSlider from './sub/TimeSlider';

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
            onChange={this.props.onChange}
          />
        </div>
        <div className="time-wrapper">
          <TimeSlider
            moment={mom}
            locale={this.props.locale}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}

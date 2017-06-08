import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import InputSlider from 'react-input-slider';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Time';
  }

  getMoment() {
    return this.props.moment || moment();
  }

  render() {
    let m = this.getMoment();

    return (
      <div className={cx('im-time', this.props.className)}>
        <div className="showtime">
          <span className="time">{m.format('HH')}</span>
          <span className="separator">:</span>
          <span className="time">{m.format('mm')}</span>
          {this.props.showSeconds &&
            <span>
              <span className="separator">:</span>
              <span className="time">{m.format('ss')}</span>
            </span>
          }
        </div>

        <div className="sliders">
          <div className="time-text">Hours:</div>
          <InputSlider
            className="im-slider-time"
            xmin={0}
            xmax={23}
            x={m.hour()}
            onChange={this.changeHours.bind(this)}
          />
          <div className="time-text">Minutes:</div>
          <InputSlider
            className="im-slider-time"
            xmin={0}
            xmax={59}
            x={m.minute()}
            onChange={this.changeMinutes.bind(this)}
          />
          {this.props.showSeconds &&
            <div className="time-text">Seconds:</div>
          }
          {this.props.showSeconds &&
            <InputSlider
              className="im-slider-time"
              xmin={0}
              xmax={59}
              x={m.second()}
              onChange={this.changeSeconds.bind(this)}
            />
          }
        </div>
      </div>
    );
  }

  changeHours(pos) {
    let m = this.getMoment();
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  }

  changeMinutes(pos) {
    let m = this.getMoment();
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }

  changeSeconds(pos) {
    let m = this.getMoment();
    m.seconds(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
}


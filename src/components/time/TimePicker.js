import cx from 'classnames';
import React from 'react';
import InputSlider from 'react-input-slider';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mom = this.props.moment;

    return (
      <div className={cx('im-time-picker', this.props.className)}>
        <div className="time-picker-wrapper">
          <div className="showtime">
            <span className="time">{mom.format('HH')}</span>
            <span className="separator">:</span>
            <span className="time">{mom.format('mm')}</span>
            {this.props.showSeconds &&
              <span>
                <span className="separator">:</span>
                <span className="time">{mom.format('ss')}</span>
              </span>
            }
          </div>

          <div className="sliders">
            <div className="time-text">Hours:</div>
            <InputSlider
              className="im-slider"
              xmin={0}
              xmax={23}
              x={mom.hour()}
              onChange={this.changeHours.bind(this)}
            />
            <div className="time-text">Minutes:</div>
            <InputSlider
              className="im-slider"
              xmin={0}
              xmax={59}
              x={mom.minute()}
              onChange={this.changeMinutes.bind(this)}
            />
            {this.props.showSeconds &&
              <div className="time-text">Seconds:</div>
            }
            {this.props.showSeconds &&
              <InputSlider
                className="im-slider"
                xmin={0}
                xmax={59}
                x={mom.second()}
                onChange={this.changeSeconds.bind(this)}
              />
            }
          </div>
        </div>
      </div>
    );
  }

  changeHours(pos) {
    let mom = this.props.moment.clone();
    mom.hours(parseInt(pos.x, 10));
    this.props.onChange(mom);
  }

  changeMinutes(pos) {
    let mom = this.props.moment.clone();
    mom.minutes(parseInt(pos.x, 10));
    this.props.onChange(mom);
  }

  changeSeconds(pos) {
    let mom = this.props.moment.clone();
    mom.seconds(parseInt(pos.x, 10));
    this.props.onChange(mom);
  }
}

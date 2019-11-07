import cx from 'classnames';
import React from 'react';
import InputSlider from 'react-input-slider';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mom = this.props.moment;
    let xstep = this.props.xstep ? this.props.xstep : 5;
    let minutes = this.getMinutes(mom);

    return (
      <div className={cx('im-time-slider', this.props.className)}>
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
          <InputSlider
            className="im-slider"
            xmin={0}
            xmax={1439}
            xstep={xstep}
            x={minutes}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  onChange(pos) {
    if (window.event && window.event.stopPropagation) window.event.stopPropagation();  //bug fix for picker within react modal component

    let mom = this.props.moment.clone();
    let totalMin = parseInt(pos.x, 10);

    let hours = Math.floor(totalMin / 60);
    let minutes = totalMin % 60;

    mom.hours(hours).minutes(minutes);
    this.props.onChange(mom);
  }

  getMinutes(mom) {
    return mom.hours() * 60 + mom.minutes();
  }
}

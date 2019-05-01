require('../src/less/base.less');
require('./app.less');

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {InputMoment, BigInputMoment, DatePicker, DatePickerRange, TimePicker} from '../src/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputMoment: moment(),
      bigInputMoment: moment(),
      datePickerMoment: moment(),
      datePickerRangeStartMoment: moment().subtract(3, 'days'),
      datePickerRangeEndMoment: moment(),
      timePickerMoment: moment(),
      showSeconds: true,
      locale: 'en',
      size: 'medium'
    };
  }

  render() {
    let {inputMoment, bigInputMoment, datePickerMoment, datePickerRangeStartMoment, datePickerRangeEndMoment, timePickerMoment, showSeconds, locale, size} = this.state;
    let wrapperClass = 'wrapper ' + size;

    return (
      <div className="app">
        <div className="header">
          React Input Moment
        </div>

        <input
          type="button"
          className="header-button"
          value="GitHub"
          onClick={() => window.location = 'https://github.com/wayofthefuture/react-input-moment'}
        />
        <input
          type="button"
          className="header-button"
          value="NPM"
          onClick={() => window.location = 'https://www.npmjs.com/package/react-input-moment'}
        />
        <br/>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={showSeconds}
              onChange={this.handleShowSeconds.bind(this)}
              />
            Show Seconds
          </label>
          <br/>
          <label>
            Locale:&nbsp;
            <select value={locale} onChange={this.handleLocale.bind(this)}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
            </select>
          </label>
          <br/>

          <input
            type="button"
            className="header-button"
            value="Small"
            onClick={() => this.setState({size: 'small'})}
          />
          <input
            type="button"
            className="header-button"
            value="Medium"
            onClick={() => this.setState({size: 'medium'})}
          />
          <input
            type="button"
            className="header-button"
            value="Large"
            onClick={() => this.setState({size: 'large'})}
          />
        </div>

        <div className="header">InputMoment</div>
        <input
          className="output"
          type="text"
          value={inputMoment.format('llll')}
          readOnly
        />
        <div className={wrapperClass}>
          <InputMoment
            moment={inputMoment}
            locale={locale}
            showSeconds={showSeconds}
            onChange={mom => this.setState({inputMoment: mom})}
          />
        </div>
        <br/>

        <div className="header">BigInputMoment</div>
        <input
          className="output"
          type="text"
          value={bigInputMoment.format('llll')}
          readOnly
        />
        <div className={wrapperClass}>
          <BigInputMoment
            moment={bigInputMoment}
            locale={locale}
            showSeconds={showSeconds}
            onChange={mom => this.setState({bigInputMoment: mom})}
          />
        </div>
        <br/>

        <div className="header">DatePicker</div>
        <input
          className="output"
          type="text"
          value={datePickerMoment.format('llll')}
          readOnly
        />
        <div className={wrapperClass}>
          <DatePicker
            moment={datePickerMoment}
            locale={locale}
            showSeconds={showSeconds}
            onChange={mom => this.setState({datePickerMoment: mom})}
          />
        </div>
        <br/>

        <div className="header">DatePickerRange</div>
        <input
          style={{width: '525px'}}
          className="output"
          type="text"
          value={datePickerRangeStartMoment.format('llll') + ' - ' + datePickerRangeEndMoment.format('llll')}
          readOnly
        />
        <div className={wrapperClass}>
          <DatePickerRange
            startMoment={datePickerRangeStartMoment}
            endMoment={datePickerRangeEndMoment}
            locale={locale}
            onChange={(startMoment, endMoment) => this.setState({datePickerRangeStartMoment: startMoment, datePickerRangeEndMoment: endMoment})}
          />
        </div>
        <br/>

        <div className="header">TimePicker</div>
        <input
          className="output"
          type="text"
          value={timePickerMoment.format('llll')}
          readOnly
        />
        <div className={wrapperClass}>
          <TimePicker
            moment={timePickerMoment}
            locale={locale}
            showSeconds={showSeconds}
            onChange={mom => this.setState({timePickerMoment: mom})}
          />
        </div>
      </div>
    );
  }

  handleShowSeconds(e) {
    this.setState({showSeconds: e.target.checked});
  }

  handleLocale(e) {
    this.setState({locale: e.target.value});
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

//testing
window.moment = moment;

require('../src/less/input-moment.less');
require('./app.less');

import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import {InputMoment, DatePicker, TimePicker} from '../src/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';

    this.state = {
      inputmoment_m: moment(),
      calendar_m: moment(),
      clock_m: moment(),
      showSeconds: true,
      locale: 'en',
      size: 'medium'
    };
  }

  getMomentDisplay(demo) {
    let m = this.state[demo + '_m'];
    return m ? m.format('llll') : '';
  }

  render() {
    let {size} = this.state;
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
              checked={this.state.showSeconds}
              onChange={this.handleShowSeconds.bind(this)}
              />
            Show Seconds
          </label>
          <br/>
          <label>
            Locale:&nbsp;
            <select value={this.state.locale} onChange={this.handleLocale.bind(this)}>
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
          value={this.getMomentDisplay('inputmoment')}
          readOnly
        />
        <div className={wrapperClass}>
          <InputMoment
            moment={this.state.inputmoment_m}
            locale={this.state.locale}
            showSeconds={this.state.showSeconds}
            onChange={this.handleChange.bind(this, 'inputmoment')}
          />
        </div>
        <br/>

        <div className="header">DatePicker</div>
        <input
          className="output"
          type="text"
          value={this.getMomentDisplay('calendar')}
          readOnly
        />
        <div className={wrapperClass}>
          <DatePicker
            moment={this.state.calendar_m}
            locale={this.state.locale}
            showSeconds={this.state.showSeconds}
            onChange={this.handleChange.bind(this, 'calendar')}
          />
        </div>
        <br/>

        <div className="header">TimePicker</div>
        <input
          className="output"
          type="text"
          value={this.getMomentDisplay('clock')}
          readOnly
        />
        <div className={wrapperClass}>
          <TimePicker
            moment={this.state.clock_m}
            locale={this.state.locale}
            showSeconds={this.state.showSeconds}
            onChange={this.handleChange.bind(this, 'clock')}
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

  handleChange(demo, m) {
    this.setState({[demo + '_m']: m});
  }

  handleCancel(demo) {
    this.setState({[demo + '_m']: null});
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

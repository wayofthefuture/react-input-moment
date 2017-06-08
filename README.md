# input-moment
React datetime picker powered by [momentjs](http://momentjs.com)

This is a fork of [input-moment](https://github.com/wangzuo/input-moment) that
aims to add more functionality and make less assumptions about environment.

### Requirements
This module has peer dependencies: react, react-dom, and moment.
These dependencies are not included in the build to reduce duplicate dependencies as a result of minor version differences.
This allows for a flat dependency graph and should significantly reduce build size.
[Read More Here](https://docs.npmjs.com/how-npm-works/npm3)

### Usage
``` javascript
import {InputMoment, DatePicker, TimePicker} from 'react-input-moment';

<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  showSeconds={true}
  locale="en"
/>

<DatePicker
  moment={this.state.moment}
  onChange={this.handleChange}
  locale="en"
/>

<TimePicker
  moment={this.state.moment}
  onChange={this.handleChange}
  showSeconds={true}
  locale="en"
/>
```

Check [app.js](https://github.com/wayofthefuture/react-input-moment/blob/master/example/app.js)
for a working example.

### Development
- npm install react react-dom moment
- npm install
- npm start
- http://localhost:8888

### License
ISC

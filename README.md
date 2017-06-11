React date and time pickers powered by [MomentJS](http://momentjs.com).

This project is created from an older GitHub project by [Prometheus Research](https://github.com/prometheusresearch/react-input-moment).
I wanted to add more functionality, but the other project was not being maintained and not being published to NPM so we created this repo.

### Demo
[A demo can be viewed here](https://wayofthefuture.github.io/react-input-moment/)

### Requirements
This module has peer dependencies: react, react-dom, and moment.
These dependencies are not included in the build to reduce duplicate dependencies as a result of minor version differences.
This allows for a flat dependency graph and should significantly reduce build size.
[Read More Here](https://docs.npmjs.com/how-npm-works/npm3)

### Installation
- npm install react react-dom moment --save
- npm install react-input-moment --save
- Go download [input-moment.min.css](https://github.com/wayofthefuture/react-input-moment/tree/master/css) and drop it as a css style link in your html page.

### Sizing
As with many css components, getting them to look the way you want on all devices is not always so easy. These pickers are
designed to stretch to their parent container element. The parent wrapper must have a set width and height.

### Colors
If you want to override the default colors and use your own color scheme, see the scss in [this file](https://github.com/wayofthefuture/react-input-moment/blob/master/example/colors.scss).

``` javascript
import {InputMoment, BigInputMoment, DatePicker, TimePicker} from 'react-input-moment';

//all wrapper classes should have a set width and height.
//percentages will work as long as the parent of the wrapper has a set width and height.

<div className="wrapper">
  <InputMoment
    moment={this.state.moment}
    onChange={this.handleChange}
    showSeconds={true}
    locale="en"
  />
</div>

<div className="wrapper">
  <BigInputMoment
    moment={this.state.moment}
    onChange={this.handleChange}
    locale="en"
  />
</div>

<div className="wrapper">
  <DatePicker
    moment={this.state.moment}
    onChange={this.handleChange}
    locale="en"
  />
</div>

<div className="wrapper">
  <TimePicker
    moment={this.state.moment}
    onChange={this.handleChange}
    showSeconds={true}
    locale="en"
  />
</div>
```

Check [app.js](https://github.com/wayofthefuture/react-input-moment/blob/master/example/app.js)
for a working example.

### Development
- git clone https://github.com/wayofthefuture/react-input-moment.git
- cd react-input-moment
- npm install react react-dom moment
- npm install
- npm start
- http://localhost:8888

### License
ISC

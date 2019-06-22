import React, { Component } from 'react';
import AppComponent from './AppComponent';

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      solDate: 0,
      camera: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit = e => {

  }

  onChange = e => {

  }

  render () {
    return (
      <React.Fragment>
        <AppComponent onSubmit={this.onSubmit} onChange={this.onChange}/>
      </React.Fragment>
    )
  }
}
export default AppContainer;

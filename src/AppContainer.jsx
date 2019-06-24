import React, { Component } from 'react';
import AppComponent from './AppComponent';

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sol: null,
      camera: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit = e => {
    e.preventDefault()

    var url = "/api/v1?sol=" + this.state.sol + "&camera=" + this.state.camera
    
    fetch(url)
      .then(response => response.json()
      .then(response => console.log(response)))
      .catch(error => console.error(error))

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render () {
    return (
      <React.Fragment>
        <AppComponent onSubmit={this.onSubmit} onChange={this.onChange}/>
        <div>
          sol: {this.state.sol}<br/>
          camera: {this.state.camera}<br/>
        </div>
      </React.Fragment>
    )
  }
}
export default AppContainer;

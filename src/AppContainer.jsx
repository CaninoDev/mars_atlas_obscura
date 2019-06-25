import React, { Component } from 'react';
import FormComponent from './FormComponent';

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sol: "",
      camera: "fhaz",
      images: null,
      maxSolDate: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    var url = "/api/v1/manifests"
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({
        maxSolDate: response.photo_manifest.max_sol
      }))
  }

  onSubmit = e => {
    e.preventDefault()

    var url = "/api/v1?sol=" + this.state.sol + "&camera=" + this.state.camera
    
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({
        images: response
      }))
      .catch(error => console.error(error))
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  renderList = data => {
    return data.photos.map(image => (
      <li key={image.id}>{image.img_src}</li>
    ))
  }

  render () {
    const { sol, camera, images, maxSolDate } = this.state
    //const disabled = (sol !== "" && maxSolDate != null) ? false : true
    return (
      <React.Fragment>
        <FormComponent onSubmit={this.onSubmit} onChange={this.onChange} maxSolDate={maxSolDate} />
        <div>
          sol: {sol}<br/>
          camera: {camera}<br/>
          maxSolDate: {maxSolDate}
        </div>
        <ul>
          {images != null && this.renderList(images)}
        </ul>
      </React.Fragment>
    )
  }
}
export default AppContainer;

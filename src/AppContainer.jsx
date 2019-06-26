import React, { Component } from 'react';
import FormComponent from './FormComponent';
import ImageComponent from './ImageComponent';

import Grid from '@material-ui/core/Grid';

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
    var url = "/api/manifests"
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({
        maxSolDate: response.photo_manifest.max_sol
      }))
  }

  onSubmit = e => {
    e.preventDefault()

    var url = "/api/photos?sol=" + this.state.sol + "&camera=" + this.state.camera
    
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          images: response.photos
        })
      })
      .catch(error => console.error(error))
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  renderList = data => {
    return data.map(image => (
      <li key={image.id}>{image.img_src}</li>
    ))
  }

  render () {
    const { images, maxSolDate } = this.state
    return (
      <React.Fragment>
        <FormComponent onSubmit={this.onSubmit} onChange={this.onChange} maxSolDate={maxSolDate} />
        <Grid container spacing={16}>
          {images != null && images.map((imageData => <ImageComponent key={imageData.id} data={imageData} /> ))}
        </Grid>
      </React.Fragment>
    )
  }
}
export default AppContainer;

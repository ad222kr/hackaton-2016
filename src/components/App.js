import React, {Component} from 'react'
import {getCurrentLocation} from '../lib/location'
import logo from '../logo.svg'
import '../style/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentLocation: {}
    }
  }


  componentDidMount() {
    getCurrentLocation()
      .then(res => this.setState({ currentLocation: res}))
      .catch(err => console.log(err))
  }
  render() {
    const { currentLocation } = this.state
    return (
      <div>
      <h1>Hej!</h1>
      {currentLocation && <p>{currentLocation.latitude} {currentLocation.longitude}</p>}
      </div>
    )
  }
}

export default App

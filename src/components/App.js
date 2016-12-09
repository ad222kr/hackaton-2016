import React, {Component} from 'react'
import {getCurrentLocation, returnFetch} from '../lib/location'
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
      .then(() => returnFetch(this.state.currentLocation))
      .then(res => console.log(res))
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

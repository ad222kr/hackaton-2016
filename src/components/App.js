import React, {Component} from 'react'
import {getCurrentLocation} from '../lib/location'
import logo from '../logo.svg'
import '../style/App.css'

class App extends Component {
  componentDidMount() {
    getCurrentLocation()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App

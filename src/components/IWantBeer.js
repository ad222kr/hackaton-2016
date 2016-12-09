import React, {Component} from 'react'
import {getCurrentLocation, returnFetch} from '../lib/location'

export default class IWantBeer extends Component {
  componentDidMount() {
    getCurrentLocation()
      .then(res => this.setState({ currentLocation: res}))
      .then(() => returnFetch(this.state.currentLocation))
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        I want ze beer
      </div>
    )
  }
}
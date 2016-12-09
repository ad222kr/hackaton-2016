import React, {Component} from 'react'
import {getCurrentLocation, getStoresNearby} from '../lib/location'

class IWantBeer extends Component {
  constructor() {
    super()
    this.state = {
      stores: null
    }
  }
  async componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'))
    const places = new window.google.maps.places.PlacesService(map)
    const loc = await getCurrentLocation()
    const stores = await getStoresNearby(places, {
      lat: loc.latitude,
      lng: loc.longitude
    })

    console.log(window.google.maps)
    console.log(stores)
    this.setState({
      stores,
    })

  }

  render() {
      return <div>
        <div id='map'></div>
          <button onClick={this.beerTime}>Jag vill dricka öl nu!</button>
        </div>
    
    
    
  }
}

export default IWantBeer
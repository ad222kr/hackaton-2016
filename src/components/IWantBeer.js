import React, {Component} from 'react'
import {getCurrentLocation, getStoresNearby, getTravelInformation} from '../lib/location'

class IWantBeer extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      isOpen: null,
      address: null,
      distance: null,
      duration: null,
    }
  }
  async componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'))
    const places = new window.google.maps.places.PlacesService(map)
    const directionService = new window.google.maps.DistanceMatrixService()
    
    const loc = await getCurrentLocation()
    const stores = await getStoresNearby(places, {
      lat: loc.latitude,
      lng: loc.longitude
    })
    console.log(stores[0])
    const origin = new window.google.maps.LatLng(loc.latitude, loc.longitude)
    const destination = new window.google.maps.LatLng(
      stores[0].geometry.location.lat(),
      stores[0].geometry.location.lng(),
    )
    const travelInfo = await getTravelInformation(origin, destination)
    console.log(travelInfo)
    const {distance, duration} = travelInfo.rows[0].elements[0]
    console.log(distance)
    console.log(duration)
    this.setState({
      loading: false,
      isOpen: stores[0].opening_hours.open_now,
      address: stores[0].vicinity,
      distance,
      duration,
    })
  }

  isOpenNow() {
    if( this.state.isOpen){
      return "Och det är öppet det kommer ta dig ungefär "+ this.getTime() + " att gå ditt"
    }else{
      return "och det är tyvärr stängt" 
    }
  }

  render() {
    console.log(this.state.loading)
    if (this.state.loading) {
      return <h1>Laddar</h1>
    } else {
      return (
        <div>
          <h1>{this.isOpenNow()}</h1>
          <p>{this.state.address}</p>
          <p>{this.state.distance.text}</p>
          <p>{this.state.duration.text}</p>
        </div>
      )
    }
  }
}

export default IWantBeer

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
      closing: null,
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
    await this.getOpeningHours(stores[0].vicinity)
    this.setState({
      loading: false,
      isOpen: stores[0].opening_hours.open_now,
      address: stores[0].vicinity,
      distance,
      duration,
    })
  }

  isOpenNow() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    // const closingHour = this.state.closing.substring(0, this.state.closing.indexOf(':'))
    // const closingMinute = this.state.closing.substring(1, this.state.closing.indexOf(':'))
    console.log(this.state.duration)
    const closingHour = 3
    const closingMinute = 45
    const hoursLeft = closingHour - hours
    const minutesLeft = closingMinute - minutes
    console.log(closingHour + '' + closingMinute)
    console.log('hours '+hours + minutes)
    // if( this.state.isOpen){
    if( true){
      const date = new Date()
      const hours = date.getHours

      console.log('hours '+hours)

      return "Och det är öppet!! dom stänger dock "+ this.state.closing +' så du har '+ hoursLeft + ' timmar och ' + minutesLeft + ' minuter på dig'
    }else{
      return "Men det stängde klockan "+ this.state.closing
    }
  }

  getOpeningHours(adress) {
    console.log(adress)
    const theAddress = adress.substring(0, adress.indexOf(','))
    console.log(theAddress)
    return fetch('https://systemet-wrapper-hgclklumew.now.sh/opening-hours?address='+theAddress,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(function (res) {
      return res.json()
    })
    .then(resJson => {
      this.setState({
        closing: resJson.data
      })
    })
  }

  render() {

    console.log(this.state.loading)
    if (this.state.loading) {
      return <h1>Laddar</h1>
    } else {
      return (
        <div>
          <h1>Ditt närmsta systembolag ligger på {this.state.address}</h1>
          <h4>Det är {this.state.distance.text} ditt och om du går kommer det ta dig ungefär {this.state.duration.text} att komma ditt.</h4>
          <h4>{this.isOpenNow()}</h4>
        </div>
      )
    }
  }
}

export default IWantBeer

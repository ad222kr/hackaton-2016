import React, {Component} from 'react'
import {getCurrentLocation, getStoresNearby} from '../lib/location'

class IWantBeer extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: null,
      adress: null
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

    this.setState({
      isOpen: stores[0].opening_hours.open_now,
      adress: stores[0].vicinity
    })

  }

  isOpenNow() {
    if( this.state.isOpen){
      return "Och det är öppet det kommer ta dig ungefär "+ this.getTime() + " att gå ditt"
    }else{
      return "och det är tyvärr stängt" 
    }
  }

  getTime() {
    fetch('https://maps.googleapis.com/maps/api/directions/json?origin=56.6888163,16.364827599999998&destination= 56.67046149999999,16.3354124&mode=walking&key=AIzaSyDMttPm-7O9LoGlL2uxqX6QQFmhknEnIBU', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json)
    .then(resjson => console.log(resjson))
  }



  render() {


      return <div>
        <div id='map'></div>
          <button onClick={this.beerTime}>Jag vill dricka öl nu!</button>
          <h4>Ditt närmsta system bolag ligger på {this.state.adress}</h4>
          <p>{this.isOpenNow()}</p>
        </div>

  }
}

export default IWantBeer

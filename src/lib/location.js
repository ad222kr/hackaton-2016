const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
  apikey: 'AIzaSyCfkMXJZj5n8qBla3zBKsQNVOYX-Q0-r4g'
}

export const API_KEY = 'AIzaSyCfkMXJZj5n8qBla3zBKsQNVOYX-Q0-r4g'

export function getCurrentLocation() {
  console.log(navigator.geolocation)
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords
        return resolve({latitude, longitude})
      },
      error => reject(error)
    )
  })
}

export function getStoresNearby(places, {lat, lng}) {
  return new Promise((resolve, reject) => {
    places.nearbySearch({
      location: {
        lat,
        lng
      },
      radius: 5000,
      name: 'systembolaget'
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK)
        return resolve(results)
      return reject('Something went wrong')
    })
  })
}

const distanceService = new window.google.maps.DistanceMatrixService()

export function getTravelInformation(origin, destination, travelMode = 'WALKING') {
  return new Promise((resolve, reject) => {
    
    distanceService.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode,
      unitSystem: window.google.maps.UnitSystem.METRIC,

    }, (response, status) => {
      if (status === 'OK') 
        return resolve(response)
      return reject('Something went wrong')
    })
  })
}

export function returnFetch(currentLocation) {
  return fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query="systembolaget"&key='+options.apikey+'&location=56.6888163,16.364827599999998', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(function (res) {
    return res.json()
  })
  .then(function (resJson) {
    console.log(resJson.results[0].geometry.location)
    return fetch('https://maps.googleapis.com/maps/api/directions/json?origin=56.6888163,16.364827599999998&destination= '+resJson.results[0].geometry.location.lat +','+resJson.results[0].geometry.location.lng+'&mode=WALKING&key='+options.apikey, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (res) {
      return res.json()
    })
    .then(function (resJson) {
      console.log(resJson.routes[0].legs[0].duration.text)
      console.log(resJson.routes[0].legs[0].distance.text)
      console.log(resJson.routes[0].legs[0].end_address)
      const info = {
        'time': resJson.routes[0].legs[0].duration.text,
        'distance': resJson.routes[0].legs[0].distance.text,
        'place': resJson.routes[0].legs[0].end_address
      }

      return info
    })
  })
}

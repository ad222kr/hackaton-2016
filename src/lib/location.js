const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
  apikey: 'AIzaSyDMttPm-7O9LoGlL2uxqX6QQFmhknEnIBU'
}

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



export function returnFetch(currentLocation) {
  return fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query="systembolaget"&key='+options.apikey+'&location= 56.6888163,16.364827599999998', {

    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })
  .then(function (res) {
    return res.json()
  })
  .then(function (resJson) {
    console.log(resJson.results[0].geometry.location)
    return fetch('https://maps.googleapis.com/maps/api/directions/json?origin=56.6888163,16.364827599999998&destination= '+resJson.results[0].geometry.location.lat +','+resJson.results[0].geometry.location.lng+'&mode=WALKING&key='+options.apikey, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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

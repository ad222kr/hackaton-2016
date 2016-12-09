const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
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
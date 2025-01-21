export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          if (!isNaN(latitude) && !isNaN(longitude)) {
            resolve({ lat: latitude, lng: longitude })
          } else {
            reject(new Error('Invalid coordinates.'))
          }
        },
        (error) => {
          reject(error)
        }
      )
    } else {
      reject(new Error('Geolocation not supported in this browser.'))
    }
  })
}

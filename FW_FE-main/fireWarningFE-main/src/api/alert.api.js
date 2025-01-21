import axios from 'axios'

const alertsApi = axios.create({
  baseURL: 'http://localhost:8000/alert/api/v1/',
})

export const createAlert = (
  description,
  latitude,
  longitude,
  pictureBase64
) => {
  const formDataLocation = new FormData()
  formDataLocation.append('latitude', latitude)
  formDataLocation.append('longitude', longitude)

  return alertsApi
    .post('location/', formDataLocation)
    .then((locationResponse) => {
      const locationId = locationResponse.data.id

      // Decodificar la imagen base64
      const format = 'image/jpeg' // O el formato correcto de tu imagen
      const imgstr = pictureBase64.split(';base64,')[1]
      const pictureBlob = new Blob(
        [
          new Uint8Array(
            atob(imgstr)
              .split('')
              .map((c) => c.charCodeAt(0))
          ),
        ],
        { type: format }
      )
      const pictureFile = new File([pictureBlob], 'image.jpg', { type: format })

      const formDataRecord = new FormData()
      formDataRecord.append('description', description)
      formDataRecord.append('location', locationId)
      formDataRecord.append('picture', pictureFile)

      return alertsApi.post('record/', formDataRecord)
    })
}

export const getAlert = () => {
  return alertsApi.get('record/').then(async (response) => {
    const records = response.data

    const locationPromises = records.map(async (record) => {
      const locationId = record.location

      const locationResponse = await alertsApi.get(`location/${locationId}`)

      return {
        ...record,
        location: locationResponse.data, // Assuming locationResponse.data contains latitude and longitude
      }
    })

    return Promise.all(locationPromises)
  })
}

export const getAllUser = () => alertsApi.get('user/')

export const deleteAlert = (alertId) => {
  return alertsApi
    .delete(`record/${alertId}`)
    .then((response) => {
      // La alerta se ha eliminado con éxito
      console.log(`Alerta con ID ${alertId} eliminada.`)
      return response.data
    })
    .catch((error) => {
      // Manejar errores en caso de que la eliminación falle
      console.error(
        `Error al eliminar la alerta con ID ${alertId}: ${error.message}`
      )
      throw error
    })
}

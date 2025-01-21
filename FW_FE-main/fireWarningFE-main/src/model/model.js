import * as tf from '@tensorflow/tfjs'

const MODEL_URL = 'src/model/model.json'

const loadModel = async () => {
  try {
    console.log('Cargando modelo...')
    const model = await tf.loadLayersModel(MODEL_URL)
    console.log('Modelo cargado exitosamente')
    return model
  } catch (error) {
    console.error('Error al cargar el modelo:', error.message)
    throw error
  }
}

export default loadModel

import * as tf from '@tensorflow/tfjs'
import loadModel from '../model/model'

export const setupCamera = async (videoRef, width, height) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width, height },
    })

    videoRef.current.srcObject = stream

    return new Promise((resolve) => {
      videoRef.current.onloadedmetadata = () => {
        resolve(videoRef.current)
      }
    })
  } catch (error) {
    console.error('Error al configurar la cámara:', error)
    throw error
  }
}

export const loadModelAndCamera = async (modeloRef, setupCamera, predict) => {
  try {
    console.log('Cargando modelo...')
    modeloRef.current = await loadModel()
    console.log('Modelo cargado')

    const video = await setupCamera()
    video.play()
    await setupCamera()
    predict()
  } catch (error) {
    console.error('Error al cargar el modelo o la cámara:', error)
  }
}

export const predict = async (videoRef, modeloRef, canvasRef, setResult) => {
  if (modeloRef.current !== null) {
    const ctx = canvasRef.current.getContext('2d')

    canvasRef.current.width = 100
    canvasRef.current.height = 100

    ctx.drawImage(videoRef.current, 0, 0, 100, 100)

    const imgData = ctx.getImageData(0, 0, 100, 100)
    const arr = []

    for (let p = 0; p < imgData.data.length; p += 4) {
      const rojo = imgData.data[p] / 255
      const verde = imgData.data[p + 1] / 255
      const azul = imgData.data[p + 2] / 255

      arr.push(rojo, verde, azul)
    }

    const tensor = tf.tensor(arr).reshape([1, 100, 100, 3])
    const resultado = modeloRef.current.predict(tensor)
    const data = await resultado.data()
    const mayorIndice = data.indexOf(Math.max(...data))
    const clases = ['Normal', 'Incendio']
    setResult(clases[mayorIndice])

    if (clases[mayorIndice] === 'Incendio') {
      console.log('¡Incendio detectado!')
      videoRef.current.pause()
      return
    }
  }

  requestAnimationFrame(() =>
    predict(videoRef, modeloRef, canvasRef, setResult)
  )
}

export const switchCamera = async (
  currentStream,
  facingMode,
  width,
  height,
  setFacingMode,
  setChangeCamera,
  videoRef,
  setCurrentStream
) => {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => {
      track.stop()
    })
  }

  const newFacingMode = facingMode === 'user' ? 'environment' : 'user'
  setFacingMode(newFacingMode)

  const options = {
    audio: false,
    video: {
      facingMode: newFacingMode,
      width,
      height,
    },
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(options)
    setCurrentStream(stream)
    setChangeCamera((prevChangeCamera) => !prevChangeCamera)
    videoRef.current.srcObject = stream
  } catch (error) {
    console.log('Error al cambiar la cámara', error)
  }
}

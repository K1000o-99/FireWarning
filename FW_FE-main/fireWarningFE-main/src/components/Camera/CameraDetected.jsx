import React, { useEffect, useRef, useState } from 'react'
import { IoMdReverseCamera } from 'react-icons/io'
import { Camera } from './Camera'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import {
  setupCamera,
  loadModelAndCamera,
  predict,
  switchCamera,
} from '../../utils/cameraUtils'
import { getLocation } from '../../utils/locationUtils'
import { createAlert } from '../../api/alert.api'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../Loader/Loader'

const stylesCamera = {
  changesCamera: `absolute btn btn-primary h-7 w-7 top-4 right-4 opacity-60 hover:opacity-100 transition-all duration-[400ms] hover:bg-slate-400/20 ease-in rounded-full scale-150 flex items-center justify-center`,
}

export const CameraDetected = ({ scan, setPause }) => {
  const width = 432.5
  const height = 541
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const modeloRef = useRef(null)
  const [result, setResult] = useState(undefined)
  const [currentStream, setCurrentStream] = useState(null)
  const [facingMode, setFacingMode] = useState('user')
  const [changeCamera, setChangeCamera] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState(false)
  const [showModalErrorRegister, setShowModalErrorRegister] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  const navigate = useNavigate()

  const captureImage = () => {
    const { current: canvas } = canvasRef
    const { current: video } = videoRef

    if (video && canvas) {
      const { videoWidth, videoHeight } = video
      canvas.width = videoWidth
      canvas.height = videoHeight

      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, videoWidth, videoHeight)
      return canvas.toDataURL('image/jpeg')
    }
  }

  useEffect(() => {
    scan &&
      loadModelAndCamera(
        modeloRef,
        () => setupCamera(videoRef, width, height, facingMode),
        () => predict(videoRef, modeloRef, canvasRef, setResult)
      )
  }, [scan])

  useEffect(() => {
    if (result === 'Incendio') {
      setPause(true)
      setShowLoader(true)

      const fetchLocation = async () => {
        try {
          const { lat, lng } = await getLocation()
          const picture = captureImage()

          // setAlertData(data)
          createAlert('Incendio', lat, lng, picture)
            .then((response) => {
              console.log('Registro exitoso:', response.data)

              setShowLoader(false)
              setShowModal(true)
            })
            .catch((error) => {
              console.error('Error al registrar:', error)
              setShowLoader(false)
              setShowModalErrorRegister(true)
            })
        } catch (error) {
          console.error('Error al obtener la ubicación:', error.message)
          setShowLoader(false)
          setShowModalError(true)
        }
      }

      fetchLocation()
    }
  }, [result])

  const makePhoneCall = () => {
    const phoneNumber = 'tel:+56972768290'
    window.location.href = phoneNumber
    setShowModalErrorRegister(false)
  }

  const handleOnClick = () => {
    setShowModal(false)
    setShowModalError(false)
    setShowModalErrorRegister(false)
    navigate(`/`)
  }

  return (
    <>
      {scan && <Camera canvasRef={canvasRef} videoRef={videoRef} />}
      <Button
        classCont={`${changeCamera ? 'rotate-[360deg]' : ''} ${
          stylesCamera.changesCamera
        }`}
        content={<IoMdReverseCamera />}
        onClick={() =>
          scan &&
          result !== 'Incendio' &&
          switchCamera(
            currentStream,
            facingMode,
            width,
            height,
            setFacingMode,
            setChangeCamera,
            videoRef,
            setCurrentStream
          )
        }
      />

      <div
        id='resultado'
        className={`${
          result === 'Normal' ? 'text-white/80' : 'text-orange-700/80'
        } absolute bottom-5 left-4 font-extrabold`}
      >
        {result}
      </div>

      {showModal && (
        <Modal
          title={'Alerta de incendio'}
          content={
            'La alerta de incendio ha sido enviada al cuartel de bomberos. Por favor, aléjese de la zona de peligro.'
          }
          primaryButton={'Aceptar'}
          onClickPrimary={() => handleOnClick()}
        />
      )}

      {showModalError && (
        <Modal
          title={'Error al obtener la ubicación'}
          content={
            'Ocurrió un error al intentar obtener su ubicación. Asegúrese de haber otorgado los permisos necesarios para acceder a su ubicación. Si el problema persiste, le recomendamos que se comunique directamente utilizando los datos de contacto.'
          }
          primaryButton={'Aceptar'}
          onClickPrimary={() => handleOnClick()}
        />
      )}

      {showModalErrorRegister && (
        <Modal
          title={'Alerta de incendio - Error'}
          content={
            'Se produjo un error al enviar la alerta, le recomendamos que llame directamente utilizando los datos de contacto.'
          }
          secondButton={'LLamar'}
          primaryButton={'Reintentar'}
          onClickPrimary={() => handleOnClick()}
          onClickSecond={() => makePhoneCall()}
        />
      )}

      {showLoader && <Loader />}
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { deleteAlert } from '../../api/alert.api'

export const AlertCard = ({ alert }) => {
  const { id, date, location, picture } = alert

  const [showModalDelete, setShowModalDelete] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const formattedDate = (rawDate) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }
    return new Date(rawDate).toLocaleDateString('es-ES', options)
  }

  const [showImg, setShowImg] = useState(false)
  const generateGoogleMapsURL = () => {
    if (location) {
      return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    }
    return ''
  }

  useEffect(() => {
    if (isDelete) {
      deleteAlert(id)
        .then(() => {})
        .catch((error) => {})
      setShowModalDelete(false)
    }
  }, [isDelete])
  return (
    <div
      key={id}
      className='group relative flex h-[9.1rem] w-full min-w-[25rem] max-w-[40rem] rounded-md bg-slate-500/30  transition-all duration-200 ease-in '
    >
      <img
        onClick={() => setShowImg(true)}
        src={picture}
        alt='img'
        className='h-full w-48 cursor-pointer rounded-l-md transition-all duration-200 ease-in hover:opacity-75 max-md:w-[10rem]'
      />

      <section className='flex h-full flex-col justify-center  gap-y-3 p-4  '>
        <span className='absolute right-3 top-2 text-sm text-slate-300/70 transition-all duration-200 ease-in group-hover:text-slate-300'>
          {id}
        </span>

        <h4 className='text-slate-300'>
          Fecha:<br></br>
          <span className='text-purple-500'>
            {formattedDate(date).slice(0, formattedDate(date).indexOf('GMT-3'))}
          </span>
        </h4>
        {location && (
          <p className='text-slate-300'>
            Locación:
            <br></br>
            <Link
              key={id}
              to={generateGoogleMapsURL()}
              className='text-purple-500 transition-all duration-200 ease-in hover:text-purple-600'
            >
              {location.latitude}, {location.longitude}
            </Link>
          </p>
        )}
      </section>
      <button
        onClick={() => setShowModalDelete(true)}
        className='absolute right-9 top-2 rounded-md px-2 text-sm text-red-500 transition-all duration-100 ease-in hover:scale-105 hover:bg-slate-400/20 hover:text-red-600'
      >
        Eliminar
      </button>

      {showModalDelete && (
        <Modal
          title={<h3 className='pt-2'>Advertencia</h3>}
          content={'¿Estás seguro de que deseas eliminar esta alerta?'}
          primaryButton={'Aceptar'}
          secondButton={'Cancelar'}
          onClickPrimary={() => setIsDelete(true)}
          onClickSecond={() => setShowModalDelete(false)}
        />
      )}

      {showImg && (
        <Modal onClickExit={() => setShowImg(!showImg)}>
          <img
            src={picture}
            alt='img'
            className='h-[30rem] w-[30rem] rounded-md  max-md:h-[25rem] max-md:w-[25rem]'
          />
        </Modal>
      )}
    </div>
  )
}

import React from 'react'
import { Modal } from '../Modal/Modal'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'

export const AlertaModal = ({ alertShow, onClick }) => {
  const { picture, date, location, description, id } = alertShow

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

  const generateGoogleMapsURL = () => {
    if (location) {
      return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    }
    return ''
  }
  return (
    <Modal>
      <section className='text-md flex h-max w-max min-w-[15rem] max-w-max flex-col gap-y-1 rounded-lg bg-slate-200 p-3  text-slate-800 transition-all duration-200 ease-in  max-md:p-5 md:max-w-[35rem]'>
        <img
          src={picture}
          alt='img'
          className='h-[25rem] w-[30rem] rounded-lg max-md:w-full'
        />
        <div className='flex h-max w-full justify-around rounded-md border border-b-slate-300 px-1  py-3 max-md:gap-x-5 '>
          <img
            src={'./src/assets/img/5a81af7d9123fa7bcc9b0793.png'}
            alt='img'
            className='h-20 w-20 '
          />

          <div className='flex max-w-[20rem] flex-col gap-y-2 rounded-md '>
            <p className='flex flex-col leading-5'>
              <b>Fecha</b>
              <span>
                {formattedDate(date).slice(
                  0,
                  formattedDate(date).indexOf('GMT-3')
                )}
              </span>
            </p>
            {location && (
              <p className='flex flex-col leading-5'>
                <b>Locación</b>
                <Link
                  to={generateGoogleMapsURL()}
                  key={alertShow.id}
                  className='font-medium  text-purple-500 transition-all duration-200 hover:font-semibold hover:text-purple-600'
                >
                  {location.latitude},{location.longitude}
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className='flex  h-10 items-center justify-between gap-x-3 p-3 pt-3 text-white'>
          <p className='text-lg font-semibold text-slate-600'>
            {description} - {id}
          </p>
          <Button content={'Aceptar'} onClick={onClick} />
        </div>
      </section>
    </Modal>
  )
}

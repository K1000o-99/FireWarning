import React, { useEffect, useState } from 'react'
import { getAlert, createAlert } from '../../api/alert.api'
import { AlertCard } from './AlertCard'
import Pagination from './Pagination'
import { AlertaModal } from './AlertaModal'

export const AlertList = () => {
  const [alerts, setAlerts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)
  const [pageInput, setPageInput] = useState('')
  const [alertShow, setAlertShow] = useState(null)
  const [showImg, setShowImg] = useState(false)
  const [sound] = useState(new Audio('src/assets/sound/Alarma.mp3'))

  const playSound = () => {
    sound.play()
  }

  const pauseSound = () => {
    sound.pause()
  }

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const recordsWithLocation = await getAlert()
        const sortedAlerts = recordsWithLocation.sort((a, b) => b.id - a.id)
        const latestDate = alerts.length > 0 ? new Date(alerts[0].date) : null

        setAlerts(sortedAlerts)

        if (latestDate) {
          const newAlertDate = new Date(sortedAlerts[0].date)
          if (newAlertDate > latestDate) {
            setShowImg(true)
            console.log('Nueva Alerta:', sortedAlerts[0])
            playSound()
            setAlertShow(sortedAlerts[0])
          }
        }
      } catch (error) {
        console.error('Error al obtener los registros con ubicación:', error)
      }
    }

    fetchAlerts()

    const interval = setInterval(() => {
      fetchAlerts()
    }, 5000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [alerts])

  const indexOfLastAlert = currentPage * itemsPerPage
  const indexOfFirstAlert = indexOfLastAlert - itemsPerPage
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(alerts.length / itemsPerPage)

  const handlePageInputChange = (e) => {
    const { value } = e.target
    setPageInput(value)
  }

  const goToPage = () => {
    const pageNumber = parseInt(pageInput, 10)
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      setPageInput('')
    } else {
      setCurrentPage(1)
      setPageInput('')
    }
  }

  const handleClick = () => {
    pauseSound()
    setShowImg(!showImg)
  }

  return (
    <>
      <div className='h-[74%] w-full  md:w-[40rem]'>
        <div
          className={`flex h-full w-full max-w-[40rem] flex-col  gap-y-3 ${
            currentAlerts.length > 0 ? 'justify-start' : 'justify-center'
          }`}
        >
          {currentAlerts.length > 0 ? (
            <>
              {currentAlerts?.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </>
          ) : (
            <p className='flex w-full items-center justify-center text-white/50'>
              No hay resultados
            </p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages === 0 ? 1 : totalPages}
          handlePageChange={handlePageChange}
          pageInput={pageInput}
          handlePageInputChange={handlePageInputChange}
          goToPage={goToPage}
        />
      </div>

      {showImg && alertShow && (
        <AlertaModal alertShow={alertShow} onClick={handleClick} />
      )}
    </>
  )
}

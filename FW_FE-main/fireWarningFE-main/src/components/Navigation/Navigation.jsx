import { Logo } from '../Logo/Logo'
import 'boxicons'
import { NavigationSideBar } from './NavigationSideBar'
import { useAuth } from '../../context/AuthContext'
import { Contact } from '../Contact/Contact'
import { Modal } from '../Modal/Modal'
import { useState } from 'react'

export const Navigation = ({ children }) => {
  const { isLoggedIn, logout } = useAuth()
  const [isClose, setIsClose] = useState(null)
  const options = [
    { link: '/detector-camera', iconName: 'camera', label: 'Camara' },
    { link: '/alerts-log', iconName: 'bell', label: 'Alertas' },
  ]

  const handleClose = () => {
    setIsClose(false)
    logout()
  }
  return (
    <>
      <nav
        className='fixed left-0 right-0 top-0 z-10 flex h-24 items-center
    justify-between rounded-t-md border-b-2 border-b-orange-600  bg-[#2C2E30] px-[10%] shadow-lg transition-all  duration-200 
    ease-in max-lg:h-20 max-lg:px-[8%]'
      >
        <Logo content={'FW'} />

        {children}
        {isClose}
        <section>
          {isLoggedIn ? (
            <NavigationSideBar options={options} setIsClose={setIsClose} />
          ) : (
            <Contact />
          )}
        </section>
      </nav>
      {isClose && (
        <Modal
          title={'Cierre de sesión'}
          content={'¿Estás seguro de que quieres cerrar tu sesión?'}
          primaryButton={'Aceptar'}
          secondButton={'Cancelar'}
          onClickPrimary={handleClose}
          onClickSecond={() => setIsClose(false)}
        />
      )}
    </>
  )
}

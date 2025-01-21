import React, { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { NavigationMenu } from './NavigationMenu'

export const NavigationSideBar = ({ options, setIsClose }) => {
  const [isOpen, setIsOpen] = useState(false)

  const divRef = useRef(null)

  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }

  useClickOutside(divRef, setIsOpen)

  return (
    <div ref={divRef}>
      <span
        onClick={() => handleOnClick()}
        className={` flex cursor-pointer items-center rounded-full p-[.2rem] transition-all duration-200  ease-in hover:bg-slate-400/20 active:bg-slate-400/40 lg:hidden ${
          isOpen ? 'scale-0' : 'scale-150'
        }`}
      >
        <box-icon name='menu' color={'#ffffff'}></box-icon>
      </span>
      <section
        className={`${
          isOpen ? 'max-lg:translate-x-0 ' : ' max-lg:translate-x-[35rem]'
        } right-0 top-0  z-10 transition-all duration-300 ease-in-out         max-lg:fixed max-lg:h-screen  max-lg:w-[30%] max-lg:bg-black/60   max-lg:backdrop-blur-md  max-md:w-[40%]  max-sm:w-[50%] max-[400px]:w-[60%]`}
      >
        <span
          className='absolute left-4 top-5 flex scale-150 cursor-pointer items-center rounded-full p-[.2rem] transition-all duration-200  ease-in hover:bg-slate-400/20 active:bg-slate-400/40 lg:hidden'
          onClick={() => handleOnClick()}
        >
          <box-icon name='x' color='#ffffff'></box-icon>
        </span>
        <div className='h-[13%] lg:hidden'></div>

        <NavigationMenu options={options} setIsClose={setIsClose} />
      </section>
    </div>
  )
}

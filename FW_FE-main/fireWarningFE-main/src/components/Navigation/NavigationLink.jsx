import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const NavigationLink = ({ option, index }) => {
  const { isLoggedIn } = useAuth()

  if (option.link !== '/alerts-log' && !isLoggedIn) {
    return (
      <li
        key={index}
        className='flex h-max transition-all duration-200  ease-in max-lg:w-full max-sm:scale-95'
      >
        <Link
          to={option.link}
          className='relative  flex h-9 w-full items-center gap-x-2 rounded-md  bg-orange-600  px-10 py-2 shadow-lg transition-all duration-200 ease-in hover:bg-orange-700  active:bg-orange-600 active:shadow-none max-lg:justify-center  max-lg:gap-x-4'
        >
          <span className='absolute left-[.5rem] flex h-full w-6 items-center'>
            <box-icon name={option.iconName} color='#ffffff'></box-icon>
          </span>
          {option.label}
        </Link>
      </li>
    )
  }

  if (option.link && isLoggedIn) {
    return (
      <li
        key={index}
        className='flex h-max transition-all duration-200  ease-in max-lg:w-full max-sm:scale-95'
      >
        <Link
          to={option.link}
          className='relative  flex h-9 w-full items-center gap-x-2 rounded-md  bg-orange-600  px-10 py-2 shadow-lg transition-all duration-200 ease-in hover:bg-orange-700  active:bg-orange-600 active:shadow-none max-lg:justify-center  max-lg:gap-x-4'
        >
          <span className='absolute left-[.5rem] flex h-full w-6 items-center'>
            <box-icon name={option.iconName} color='#ffffff'></box-icon>
          </span>
          {option.label}
        </Link>
      </li>
    )
  }
}

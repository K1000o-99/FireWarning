import React from 'react'
import { NavigationLink } from './NavigationLink'
import { useAuth } from '../../context/AuthContext'
import { IoMdExit } from 'react-icons/io'

export const NavigationMenu = ({ options, setIsClose }) => {
  const { isLoggedIn, username } = useAuth()

  const UserNameSection = () => {
    return (
      <li key={'logout'} className='flex h-max  max-lg:w-full max-sm:scale-95'>
        <div className='relative  flex h-10 w-full  items-center justify-center gap-x-2 rounded-md px-10 py-2   max-lg:gap-x-4'>
          <span className='absolute  left-2 top-0 text-sm text-orange-600'>
            user
          </span>
          {formatingString(username)}
          <button
            className='absolute right-2 flex w-6 scale-150 items-center justify-center rounded-full p-1 hover:bg-slate-400/20 hover:text-white/50 active:bg-slate-400/40 '
            onClick={() => setIsClose(true)}
          >
            <IoMdExit />
          </button>
        </div>
      </li>
    )
  }

  return (
    <>
      <ul className='flex items-center gap-x-4 max-lg:mx-8 max-lg:mt-5 max-lg:flex-col max-lg:gap-y-5'>
        {options.map((option, index) => (
          <NavigationLink option={option} index={index} key={index} />
        ))}
        <div>{isLoggedIn ? <UserNameSection /> : ''}</div>
      </ul>
    </>
  )
}

const formatingString = (str) => str[0].toUpperCase() + str.slice(1)

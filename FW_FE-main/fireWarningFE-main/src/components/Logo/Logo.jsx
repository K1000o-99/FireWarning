import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Logo = ({ content }) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleClick = () => {
    navigate(`/${isLoggedIn ? 'alerts-log' : 'detector-camera'}`)
  }
  return (
    <div
      className='flex  cursor-pointer items-center justify-center rounded-full text-4xl font-extrabold transition-all duration-150 ease-in hover:scale-105 hover:opacity-95 max-sm:text-3xl'
      onClick={handleClick}
    >
      {content[0]}
      <span className='text-orange-500'>{content[1]}</span>
    </div>
  )
}

import React from 'react'

export const Button = ({ content, onClick, classCont }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={
        !classCont
          ? `rounded-md bg-orange-600 px-3 py-2 font-semibold transition-all duration-200 ease-in hover:bg-orange-700 active:bg-orange-600`
          : `${classCont}`
      }
    >
      {content}
    </button>
  )
}

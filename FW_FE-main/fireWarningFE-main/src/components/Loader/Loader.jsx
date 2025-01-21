import React from 'react'

export const Loader = () => {
  return (
    <div className='fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/40'>
      <span className='h-[4rem] w-[4rem] animate-spin rounded-full border-[6px] border-white/20 border-r-orange-500'></span>
    </div>
  )
}

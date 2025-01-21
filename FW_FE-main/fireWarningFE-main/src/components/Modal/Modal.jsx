import React, { useState } from 'react'
import { Button } from '../Button/Button'

export const Modal = ({
  title,
  content,
  primaryButton,
  secondButton,
  onClickPrimary,
  onClickSecond,
  children,
  onClickExit,
}) => {
  return (
    <div
      onClick={onClickExit}
      className={` fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 p-10 transition-all duration-500 ease-in ${
        onClickExit && `${!onClickExit ? 'hidden' : ''}`
      }`}
    >
      <div
        className={`flex  flex-col justify-center gap-y-2 rounded-md  transition-all duration-200 ease-in  ${
          children
            ? ''
            : 'h-max  w-max min-w-[15rem] max-w-max bg-slate-100 p-8  py-5 md:max-w-[35rem]'
        }`}
      >
        {children ? (
          <>{children}</>
        ) : (
          <>
            <h5 className='h-14 text-3xl text-slate-700 '>{title}</h5>
            <section className='min-h-[5rem] border-b border-slate-300  text-slate-700 '>
              {content}
            </section>
            <div className='flex  h-10 items-center justify-end gap-x-3 '>
              {secondButton && (
                <Button content={secondButton} onClick={onClickSecond} />
              )}
              {primaryButton && (
                <Button content={primaryButton} onClick={onClickPrimary} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

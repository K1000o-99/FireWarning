import React, { useState } from 'react'
import { CameraDetected } from './CameraDetected'
import { Button } from '../Button/Button'

const stylesCamera = {
  buttonScan: `bg-orange-600 py-2 px-3 h-9  rounded-md font-semibold hover:bg-orange-700 active:bg-orange-600  absolute bottom-5 `,
}

export const CameraControllers = () => {
  const [open, setOpen] = useState(false)
  const [pause, setPause] = useState(false)

  const loading = () => (
    <div
      className={`flex h-7 w-7 rounded-full border-[4px]  ${
        pause
          ? 'border-white/50'
          : 'animate-spin border-white/50 border-r-white'
      }`}
    ></div>
  )

  return (
    <div className=' relative flex h-[30rem] w-[24rem] flex-col  items-center rounded-lg border-4 border-slate-400/10  bg-slate-400/10 transition-all duration-300 ease-in '>
      <CameraDetected scan={open} setPause={setPause} />
      <Button
        content={!open ? 'Iniciar Deteccion' : loading(pause)}
        onClick={() => {
          setOpen(true)
        }}
        classCont={`${
          stylesCamera.buttonScan
        } active:border-2 active:border-slate-300/50 flex items-center justify-center hover:border-2 hover:border-slate-300/50 transition-all duration-300 ease-in ${
          !open ? 'w-[10rem]' : 'w-[3.5rem]'
        }`}
      />
    </div>
  )
}

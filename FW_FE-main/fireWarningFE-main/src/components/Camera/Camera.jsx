import React from 'react'

export const Camera = ({ videoRef, canvasRef }) => {
  return (
    <>
      <video
        id='video'
        className=' rounded-lg '
        playsInline
        autoPlay
        ref={videoRef}
      ></video>
      <canvas
        id='canvas'
        width='100'
        height='100'
        style={{ maxWidth: '100%', display: 'none' }}
        ref={canvasRef}
        className='hidden'
      ></canvas>
    </>
  )
}

import React from 'react'

export const Contact = () => {
  const makePhoneCall = () => {
    const phoneNumber = 'tel:+56972768290'
    window.location.href = phoneNumber
    setShowModalErrorRegister(false)
  }

  const openWhatsApp = () => {
    const phoneNumber = '+56972768290'
    const whatsappLink = `https://wa.me/${phoneNumber}`
    window.open(whatsappLink, '_blank')
  }

  const openFacebook = () => {
    const facebookLink = 'https://www.facebook.com/messages/t/898848503480547'
    window.open(facebookLink, '_blank')
  }

  return (
    <ul className='flex gap-x-4'>
      <li>
        <button
          onClick={makePhoneCall}
          className='flex scale-105 items-center justify-center rounded-full bg-blue-800 p-2 shadow-md transition-all  duration-150 ease-in hover:scale-110 hover:bg-blue-700 active:bg-blue-700'
        >
          <box-icon name={'phone-call'} color='#ffffff' />
        </button>
      </li>
      <li>
        <button
          onClick={openWhatsApp}
          className='flex  items-center justify-center rounded-full bg-green-700 p-2 shadow-md transition-all duration-150 ease-in hover:scale-110 hover:bg-green-600 active:bg-green-600'
        >
          <box-icon type='logo' name='whatsapp' color='#ffffff' />
        </button>
      </li>
      <li>
        <button
          onClick={openFacebook}
          className='flex  items-center justify-center rounded-full bg-blue-600 p-2 shadow-md transition-all  duration-150 ease-in hover:scale-110 hover:bg-blue-500 active:bg-blue-500'
        >
          <box-icon type='logo' name={'facebook'} color='#ffffff' />
        </button>
      </li>
    </ul>
  )
}

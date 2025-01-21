import { useEffect } from 'react'

export const useClickOutside = (ref, setListToggle) => {
  useEffect(() => {
    if (!setListToggle) return
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setListToggle(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [ref])
}

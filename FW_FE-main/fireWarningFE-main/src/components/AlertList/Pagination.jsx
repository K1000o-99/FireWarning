import React from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  pageInput,
  handlePageInputChange,
  goToPage,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      goToPage()
    }
  }

  return (
    <div className='relative z-[6] mt-2 flex h-12 items-center justify-between rounded-md bg-slate-500/30 p-4 px-3 pr-4'>
      <div className='flex items-center justify-around gap-x-2 '>
        <button
          className='page-link flex h-7 w-8 items-center justify-center rounded-md  bg-slate-500/20 text-sm hover:bg-slate-500/40'
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FiChevronLeft />
        </button>
        <span className='text-sm'>{`${currentPage} of ${totalPages}`}</span>
        <button
          className='page-link flex h-7 w-8 items-center justify-center rounded-md  bg-slate-500/20 text-sm hover:bg-slate-500/40'
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
      <div className='flex items-center gap-x-2'>
        <input
          type='text'
          className='h-7 w-16 resize-none rounded-md bg-slate-500/20  text-center text-sm placeholder:text-white/50'
          value={pageInput}
          onChange={handlePageInputChange}
          onKeyDown={handleKeyPress}
          placeholder={`${currentPage}`}
        />
        <button
          className='page-link flex h-7 w-8 items-center justify-center rounded-md  bg-slate-500/20 text-sm hover:bg-slate-500/40'
          onClick={goToPage}
        >
          Go
        </button>
      </div>
    </div>
  )
}

export default Pagination

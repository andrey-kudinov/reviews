/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react'

import { PaginationButton } from './pagination-button'

export const Pagination = (props: any) => {
  const {
    countPages,
    currentPage,
    currentNumRef,
    nextCardsGroup,
    prevCardsGroup,
    handleKeyNextCardsGroup,
    handleKeyPrevCardsGroup,
    ...restProps
  } = props

  return (
    <ul className='reviews__pagination pagination'>
      {currentPage > 1 && (
        <li
          tabIndex={0}
          onClick={prevCardsGroup}
          onKeyDown={handleKeyPrevCardsGroup}
          aria-label='Previous group of reviews'>
          <span className='icon-chevron-left'>&lt;</span>
        </li>
      )}

      {currentPage > 2 && countPages > 2 && (
        <PaginationButton {...restProps} currentPage={currentPage} shift={-2} />
      )}

      {currentPage > 1 && (
        <PaginationButton {...restProps} currentPage={currentPage} shift={-1} />
      )}

      <li tabIndex={0} className='active' ref={currentNumRef}>
        {currentPage}
      </li>

      {currentPage !== countPages && (
        <PaginationButton {...restProps} currentPage={currentPage} shift={1} />
      )}

      {currentPage === 1 && countPages > 2 && (
        <PaginationButton {...restProps} currentPage={currentPage} shift={2} />
      )}

      {currentPage !== countPages && (
        <li
          onClick={nextCardsGroup}
          onKeyDown={handleKeyNextCardsGroup}
          tabIndex={0}
          aria-label='Next group of reviews'>
          <span className='icon-chevron-right'>&gt;</span>
        </li>
      )}
    </ul>
  )
}

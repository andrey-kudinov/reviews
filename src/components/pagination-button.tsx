import React from 'react'

export const PaginationButton = ({
  handleChangePage,
  handleKeyChangePage,
  currentPage,
  shift
}: any) => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <li
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex={0}
    onClick={() => handleChangePage(currentPage + shift)}
    onKeyDown={(e) => handleKeyChangePage(e, currentPage + shift)}>
    {currentPage + shift}
  </li>
)

import React, { KeyboardEvent } from 'react'

interface IProps {
  // eslint-disable-next-line no-unused-vars
  handleChangePage: (page: number) => void
  // eslint-disable-next-line no-unused-vars
  handleKeyChangePage: (e: KeyboardEvent, page: number) => void
  currentPage: number
  shift: number
}

export const PaginationButton = ({
  handleChangePage,
  handleKeyChangePage,
  currentPage,
  shift
}: IProps) => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <li
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex={0}
    onClick={() => handleChangePage(currentPage + shift)}
    onKeyDown={(e) => handleKeyChangePage(e, currentPage + shift)}>
    {currentPage + shift}
  </li>
)

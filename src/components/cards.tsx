import React from 'react'

import type { ICardsData } from '../data/data'

interface IProps {
  currentCardsOnPage: ICardsData[]
}

export const Cards = (props: IProps) => {
  const { currentCardsOnPage } = props
  const cards = currentCardsOnPage.map((card: ICardsData, index: number) => {
    /**
     * ratingWidth = card rating * width of one star
     */
    const ratingWidth = { width: `${card.rating * 1}rem` } as React.CSSProperties

    const formatDate = (date: string) => {
      const parseDate = Date.parse(date)
      const options = {
        timeZone: 'Australia/Sydney'
      }

      return new Intl.DateTimeFormat('en-AU', options).format(parseDate)
    }

    return (
      <div className='reviews__card card' key={index}>
        <h4 className='card__name'>{card.author}</h4>
        <div className='card__rating-container'>
          <div className='reviews__stars-container'>
            <div className='reviews__stars-rating' style={ratingWidth} />
          </div>
          <div className='reviews__info'>{formatDate(card.date)}</div>
        </div>
        <p className='card__title'>{card.title}</p>
        <p className='card__description'>{card.body}</p>
      </div>
    )
  })

  return <div className='reviews__cards'>{cards}</div>
}

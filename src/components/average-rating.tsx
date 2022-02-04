import React from 'react'

export const AverageRating = ({ averageRating, numberOfReviews }: any) => {
  /**
   * ratingWidth = card rating * width of one star
   */
  const ratingWidth = { width: `${averageRating * 2}rem` } as React.CSSProperties

  return (
    <div className='reviews__rating-container'>
      <h3>Average ratings</h3>
      <div className='reviews__rating'>
        <div className='reviews__grade'>{averageRating}</div>
        <div className='reviews__stars-container'>
          <div className='reviews__stars-rating' style={ratingWidth} />
        </div>
        <div className='reviews__info'>
          {numberOfReviews} {numberOfReviews === 1 ? 'review' : 'reviews'}
        </div>
      </div>
    </div>
  )
}

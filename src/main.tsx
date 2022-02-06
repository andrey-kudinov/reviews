import React from 'react'
import ReactDOM from 'react-dom'

import { cardsData, productData } from './data/data'
import { randomDate, randomRating } from './helpers/helpers'
import Reviews from './Reviews'

cardsData.forEach((card) => {
  card.date = String(randomDate(new Date(2012, 0, 1), new Date()))
  card.rating = randomRating(1, 5)
})

ReactDOM.render(
  <React.StrictMode>
    <Reviews cardsData={cardsData} productData={productData} />
  </React.StrictMode>,
  document.getElementById('root')
)

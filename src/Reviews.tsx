import './styles/Reviews.scss'

import React, { FC, useEffect, useRef, useState } from 'react'

import {
  AverageRating,
  Cards,
  FailMessage,
  Form,
  Pagination,
  SuccessMessage
} from './components/'

// interface IReviews {
//   averageRating: number
//   numberOfReviews: number
//   reviewCards: IReviewCards[]
// }

// interface IReviewCards {
//   date: string
//   rating: string
//   author: string
//   title: string
//   body: string
// }

const productData = {
  averageRating: 4.5,
  numberOfReviews: 193
}

const cardsData = [
  {
    author: 'Ashley N 1',
    rating: 1.2,
    date: '3 weeks ago',
    title: 'Love it!!!',
    body: 'Love the glasses. Very durable and solid. Definitely bring out the best of me.'
  },
  {
    author: 'John 1',
    rating: 2.5,
    date: '3 weeks ago',
    title: 'Great quality',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  },
  {
    author: 'Zoe Mitchel 1',
    rating: 4.3,
    date: '3 weeks ago',
    title: 'Amazing glasses',
    body: 'Love the glasses. Very durable and solid. Definitely bring out the best of me.'
  },
  {
    author: 'Michael Ho 1',
    rating: 4.8,
    date: '3 weeks ago',
    title: 'Best glasses by far',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  },
  {
    author: 'Ashley N 2',
    rating: 1.2,
    date: '3 weeks ago',
    title: 'Love it!!!',
    body: 'Love the glasses. Very durable and solid. Definitely bring out the best of me.'
  },
  {
    author: 'John 2',
    rating: 2.5,
    date: '3 weeks ago',
    title: 'Great quality',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  },
  {
    author: 'Zoe Mitchel 2',
    rating: 4.3,
    date: '3 weeks ago',
    title: 'Amazing glasses',
    body: 'Love the glasses. Very durable and solid. Definitely bring out the best of me.'
  },
  {
    author: 'Michael Ho 2',
    rating: 4.8,
    date: '3 weeks ago',
    title: 'Best glasses by far',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  },

  {
    author: 'Ashley N 3',
    rating: 1.2,
    date: '3 weeks ago',
    title: 'Love it!!!',
    body: 'Love the glasses. Very durable and solid. Definitely bring out the best of me.'
  },
  {
    author: 'John 3',
    rating: 2.5,
    date: '3 weeks ago',
    title: 'Great quality',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  },
  {
    author: 'Zoe Mitchel 3',
    rating: 4.3,
    date: '3 weeks ago',
    title: 'Amazing glasses',
    body: 'Love the glasses. Very durable and solid. Definitely bring out the best of me.'
  },
  {
    author: 'Michael Ho 3',
    rating: 4.8,
    date: '3 weeks ago',
    title: 'Best glasses by far',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  },
  {
    author: 'Michael Ho 4',
    rating: 4.8,
    date: '3 weeks ago',
    title: 'Best glasses by far',
    body: 'Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.'
  }
]

const randomRating = (min: number, max: number) => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(1))
}

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

cardsData.forEach((card) => {
  card.date = String(randomDate(new Date(2012, 0, 1), new Date()))
  card.rating = randomRating(1, 5)
})

const consoleStyles: any = {
  log1: 'font: 2rem/1 Arial; color: crimson;',
  log2: 'font: 2rem/1 Arial; color: orangered;',
  log3: 'font: 2rem/1 Arial; color: olivedrab;',
  log4: 'font: 2rem/1 Arial; color: darkmagenta;',
  log5: 'font: 2rem/1 Arial; color: darkblue;'
}

const log = (msg: string, style: string) => {
  console.log('%c' + msg, consoleStyles[style])
}

interface IData {
  name: string
  email: string
  title: string
  review: string
  rating: string
}

const Reviews: FC<any> = () => {
  const [currentBlock, setCurrentBlock] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentCardsOnPage, setCurrentCards] = useState<any[]>([])
  const [countPages, setCountPages] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const [data, setData] = useState<IData>({
    name: '',
    email: '',
    title: '',
    review: '',
    rating: '5'
  })
  const currentNumRef = useRef<any>(null)
  let cardsOnPage = 4

  useEffect(() => {
    if (window.innerWidth < 768) {
      cardsOnPage = 2
    }

    setCountPages(Math.ceil(cardsData.length / cardsOnPage))
    displayCurrentCards((currentPage - 1) * cardsOnPage)
    setFocusOnCurrentPage()
  }, [currentPage])

  const displayCurrentCards = (step: number) => {
    setCurrentCards([...cardsData].slice(0 + step, cardsOnPage + step))
  }

  const setFocusOnCurrentPage = () => {
    if (currentNumRef.current) {
      currentNumRef.current.focus()
    }
  }

  const setForm = () => {
    setCurrentBlock('form')
  }

  const handleCancel = () => {
    setCurrentBlock('')
  }

  const handleRating = (e: any) => {
    e.persist()
    setData((state) => ({ ...state, rating: e.target.value }))
  }

  const handleName = (e: any) => {
    e.persist()
    e.target.value = cleanUpString(e.target.value)
    setData((state) => ({ ...state, name: e.target.value }))
  }

  const handleEmail = (e: any) => {
    e.persist()
    e.target.value = cleanUpString(e.target.value, true)
    setData((state) => ({ ...state, email: e.target.value }))
  }

  const handleTitle = (e: any) => {
    e.persist()
    e.target.value = cleanUpString(e.target.value)
    setData((state) => ({ ...state, title: e.target.value }))
  }

  const handleReview = (e: any) => {
    e.persist()
    e.target.value = cleanUpString(e.target.value)
    setData((state) => ({ ...state, review: e.target.value }))
  }

  const cleanUpString = (str: string, email: boolean = false) => {
    if (email) {
      // eslint-disable-next-line no-useless-escape
      return str.replace(/[^\w\d\.!#$%&'@*+/=?^_`{|}~-]/g, '')
    }

    // eslint-disable-next-line no-useless-escape
    return str.replace(/[^\w\d\s\.\-,:;_&!'?]+/g, '')
  }

  const handleCheck = (e: any) => {
    setChecked(e.target.checked)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { rating, name, email, title, review } = data
    if (
      rating === '0' ||
      !name.length ||
      !email.length ||
      !title.length ||
      !review.length ||
      !isChecked
    ) {
      return
    }

    log(`rating - ${rating}`, 'log1')
    log(`name - ${name}`, 'log2')
    log(`email - ${email}`, 'log3')
    log(`title - ${title}`, 'log4')
    log(`review - ${review}`, 'log5')

    randomRating(1, 10) < 7
      ? setCurrentBlock('success-message')
      : setCurrentBlock('fail-message')
  }

  const nextCardsGroup = () => {
    if (currentPage >= countPages) {
      return
    }
    setCurrentPage((prevState) => prevState + 1)
  }

  const prevCardsGroup = () => {
    if (currentPage < 2) {
      return
    }
    setCurrentPage((prevState) => prevState - 1)
  }

  const handleChangePage = (page: any) => {
    setCurrentPage(page)
  }

  const handleKeyNextCardsGroup = (e: React.KeyboardEvent) => {
    e.stopPropagation()

    if (e.key === 'Enter') {
      nextCardsGroup()
    }
  }

  const handleKeyPrevCardsGroup = (e: React.KeyboardEvent) => {
    e.stopPropagation()

    if (e.key === 'Enter') {
      prevCardsGroup()
    }
  }

  const handleKeyChangePage = (e: React.KeyboardEvent, page: any) => {
    e.stopPropagation()

    if (e.key === 'Enter') {
      handleChangePage(page)
    }
  }

  return (
    <section className='reviews'>
      <h2>Customer reviews</h2>

      <div
        className={`reviews__top ${
          currentBlock === 'form' ? 'reviews__top-border' : ''
        }`}>
        <AverageRating
          averageRating={productData.averageRating}
          numberOfReviews={productData.numberOfReviews}
        />

        {currentBlock === 'form' ? (
          <button className='reviews__button' onClick={handleCancel}>
            Cancel
          </button>
        ) : (
          <button className='reviews__button' onClick={setForm}>
            Write a review
          </button>
        )}
      </div>

      {currentBlock === 'form' && (
        <Form
          data={data}
          handleRating={handleRating}
          handleName={handleName}
          handleEmail={handleEmail}
          handleTitle={handleTitle}
          handleReview={handleReview}
          handleCheck={handleCheck}
          handleSubmit={handleSubmit}
        />
      )}

      {currentBlock === 'success-message' && <SuccessMessage />}
      {currentBlock === 'fail-message' && <FailMessage />}

      {!!currentCardsOnPage.length && <Cards currentCardsOnPage={currentCardsOnPage} />}

      {!!currentCardsOnPage.length && productData.numberOfReviews > cardsOnPage && (
        <Pagination
          countPages={countPages}
          currentPage={currentPage}
          currentNumRef={currentNumRef}
          nextCardsGroup={nextCardsGroup}
          prevCardsGroup={prevCardsGroup}
          handleKeyNextCardsGroup={handleKeyNextCardsGroup}
          handleKeyPrevCardsGroup={handleKeyPrevCardsGroup}
          handleChangePage={handleChangePage}
          handleKeyChangePage={handleKeyChangePage}
        />
      )}
    </section>
  )
}

export default Reviews

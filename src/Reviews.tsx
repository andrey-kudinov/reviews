import './styles/Reviews.scss'

import React, {
  FC,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  AverageRating,
  Cards,
  FailMessage,
  Form,
  Pagination,
  SuccessMessage
} from './components/'
import type { ICardsData, IProductData } from './data/data'
import { log, randomRating } from './helpers/helpers'

export interface IData {
  name: string
  email: string
  title: string
  review: string
  rating: string
}

interface IProps {
  cardsData: ICardsData[]
  productData: IProductData
}

const Reviews: FC<IProps> = (props: IProps) => {
  const { cardsData, productData } = props
  const [currentBlock, setCurrentBlock] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentCardsOnPage, setCurrentCards] = useState<ICardsData[]>([])
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

  const handleRating = (e: SyntheticEvent) => {
    e.persist()
    const input = e.target as HTMLInputElement
    setData((state) => ({ ...state, rating: input.value }))
  }

  const handleName = (e: SyntheticEvent) => {
    e.persist()
    const input = e.target as HTMLInputElement
    input.value = cleanUpString(input.value)
    setData((state) => ({ ...state, name: input.value }))
  }

  const handleEmail = (e: SyntheticEvent) => {
    e.persist()
    const input = e.target as HTMLInputElement
    input.value = cleanUpString(input.value, true)
    setData((state) => ({ ...state, email: input.value }))
  }

  const handleTitle = (e: SyntheticEvent) => {
    e.persist()
    const input = e.target as HTMLInputElement
    input.value = cleanUpString(input.value)
    setData((state) => ({ ...state, title: input.value }))
  }

  const handleReview = (e: SyntheticEvent) => {
    e.persist()
    const input = e.target as HTMLInputElement
    input.value = cleanUpString(input.value)
    setData((state) => ({ ...state, review: input.value }))
  }

  const cleanUpString = (str: string, email: boolean = false) => {
    if (email) {
      // eslint-disable-next-line no-useless-escape
      return str.replace(/[^\w\d\.!#$%&'@*+/=?^_`{|}~-]/g, '')
    }

    // eslint-disable-next-line no-useless-escape
    return str.replace(/[^\w\d\s\.\-,:;_&!'?]+/g, '')
  }

  const handleCheck = (e: SyntheticEvent) => {
    setChecked((e.target as HTMLInputElement).checked)
  }

  const handleSubmit = (e: SyntheticEvent) => {
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

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const handleKeyNextCardsGroup = (e: React.KeyboardEvent) => {
    e.stopPropagation()

    if (e.key === 'Enter') {
      nextCardsGroup()
    }
  }

  const handleKeyPrevCardsGroup = (e: KeyboardEvent) => {
    e.stopPropagation()

    if (e.key === 'Enter') {
      prevCardsGroup()
    }
  }

  const handleKeyChangePage = (e: KeyboardEvent, page: number) => {
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

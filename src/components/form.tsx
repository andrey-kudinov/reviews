import React, { Fragment } from 'react'

export const Form = (props: any) => {
  const {
    data,
    handleRating,
    handleName,
    handleEmail,
    handleTitle,
    handleReview,
    handleCheck,
    handleSubmit
  } = props

  const starSvg = (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='form__star'>
      <path
        d='M16.4755 3.08156L18.8922 10.5193C19.093 11.1373 19.6689 11.5557 20.3188 11.5557H28.1392C28.6236 11.5557 28.825 12.1755 28.4331 12.4602L22.1062 17.057C21.5805 17.439 21.3605 18.116 21.5613 18.734L23.978 26.1717C24.1277 26.6324 23.6004 27.0154 23.2086 26.7307L16.8817 22.134C16.3559 21.752 15.6441 21.752 15.1183 22.134L8.79144 26.7307C8.39959 27.0154 7.87234 26.6324 8.02202 26.1717L10.4387 18.734C10.6395 18.116 10.4195 17.439 9.89377 17.057L3.56688 12.4602C3.17503 12.1755 3.37641 11.5557 3.86078 11.5557H11.6812C12.3311 11.5557 12.907 11.1373 13.1078 10.5193L15.5245 3.08156C15.6741 2.6209 16.3259 2.6209 16.4755 3.08156Z'
        stroke='#949494'
      />
    </svg>
  )

  const starsData = [
    { ariaLabel: 'Poor' },
    { ariaLabel: 'Quite good' },
    { ariaLabel: 'Average' },
    { ariaLabel: 'Very good' },
    { ariaLabel: 'Perfection' }
  ]

  const starsRender = starsData.map((star, index) => {
    return (
      <Fragment key={index}>
        <input
          type='radio'
          name='rating'
          id={`rating-${index + 1}`}
          value={index + 1}
          className='form__star-input'
          onChange={handleRating}
          defaultChecked={data.rating === (index + 1).toString()}
          aria-label={star.ariaLabel}
        />
        <label htmlFor={`rating-${index + 1}`} className='form__star-label'>
          {starSvg}
        </label>
      </Fragment>
    )
  })

  return (
    <form className='reviews__form form' onSubmit={handleSubmit}>
      <div className='form__input-container'>
        <h5 className='form__name'>
          Rate this product
          <span title='This field is mandatory' aria-label='required'>
            *
          </span>
        </h5>
        <div className='form__stars'>{starsRender.reverse()}</div>
      </div>

      <div className='form__input-container'>
        <label className='form__name-label' htmlFor='name'>
          Name
          <span title='This field is mandatory' aria-label='required'>
            *
          </span>
        </label>
        <input
          type='text'
          id='name'
          placeholder='Enter name here'
          onBlur={handleName}
          className='form__name-input'
          minLength={2}
          maxLength={500}
          required={true}
        />
      </div>

      <div className='form__input-container'>
        <label className='form__email-label' htmlFor='email'>
          Email
          <span title='This field is mandatory' aria-label='required'>
            *
          </span>
        </label>
        <input
          type='email'
          id='email'
          placeholder='Enter email here'
          onBlur={handleEmail}
          className='form__email-input'
          minLength={4}
          maxLength={100}
          required={true}
        />
      </div>

      <div className='form__input-container'>
        <label className='form__title-label' htmlFor='title'>
          Review title
          <span title='This field is mandatory' aria-label='required'>
            *
          </span>
        </label>
        <input
          type='text'
          id='title'
          placeholder='Enter review title here'
          onBlur={handleTitle}
          className='form__title-input'
          minLength={2}
          maxLength={500}
          required={true}
        />
      </div>

      <div className='form__input-container'>
        <label className='form__textarea-label' htmlFor='review-textarea'>
          My review
          <span title='This field is mandatory' aria-label='required'>
            *
          </span>
        </label>
        <textarea
          name='review-textarea'
          id='review-textarea'
          rows={6}
          placeholder='Enter review here'
          onBlur={handleReview}
          minLength={2}
          maxLength={500}
          required={true}
        />
      </div>

      <div className='form__input-container'>
        <input type='checkbox' id='checkbox' onClick={handleCheck} required={true} />
        <label htmlFor='checkbox' className='form__checkbox-label'>
          I consent to Bupa Optical publishing my name, rating and review of this product
          on the Bupa Optical website.
        </label>
      </div>

      <button className='reviews__button' type='submit'>
        Submit review
      </button>
    </form>
  )
}

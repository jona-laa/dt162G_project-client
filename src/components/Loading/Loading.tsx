import React from 'react'
// import loader from '../../assets/images/loading.gif'

/**
 * 
 * @param text        Text underneath spinner
 * @param textColor   You guessed it... Text color!
 * @example           <Loading text={'Loading...'} textColor={'black'}>
 */
const Loading = ({ text, textColor }: LoadingProps) => {
  return (
    <div className='loading-wrapper'>
      <div className="loader"></div>
      {text && <p style={{ color: textColor ? textColor : 'white', textAlign: 'center' }}>{text}</p>}
    </div>
  )
}

export default Loading;
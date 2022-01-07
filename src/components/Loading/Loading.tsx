import React from 'react'
// import loader from '../../assets/images/loading.gif'

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className='loading-wrapper'>
      <div className="loader"></div>
      {/* <img className='loading-wrapper__loading-icon' src={loader} alt="" /> */}
      {text && <p style={{ color: 'white' }}>{text}</p>}
    </div>
  )
}

export default Loading;
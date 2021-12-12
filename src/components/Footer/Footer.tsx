import React from 'react'

/**
 * Renders Footer
 * @component
 */
const Footer = () => {
  return (
    <footer className="bg-dark">

      <small>&copy; {new Date().getFullYear()} Jona.Laa.Dev </small>

      <a href="#home" id="goTop" className="btn-top" aria-label="Go To Top">
        <svg className="arrow up" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="5 0 50 80" xmlSpace="preserve">
          <polyline fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" points="
		        0.375, 35.375 28.375, 0.375 58.67, 35.375 " />
        </svg>
      </a>

    </footer>
  )
}

export default Footer;

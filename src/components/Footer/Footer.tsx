import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { deleteCookie } from '../../services/cookieService';

/**
 * Renders Footer
 * @component
 */
const Footer: React.FC = (): JSX.Element => {
  const { authorized, setAuthorized, loginFormVisible, setLoginFormVisible } = useContext(AuthContext);

  const handleLoginLogout = (): void => {
    if (!authorized) {
      setLoginFormVisible(!loginFormVisible)
    } else {
      setAuthorized(false)
      deleteCookie('jwt')
      // setFeedback({
      //   type: 'success',
      //   title: 'Logged Out',
      //   body: 'You have been logged out'
      // })
    }
  }

  return (
    <footer className="bg-dark">

      <small>&copy; {new Date().getFullYear()} Jona.Laa.Dev </small>
      <small> <button aria-label='Close login window' className="login-btn" onClick={() => handleLoginLogout()}>{authorized ? 'Logout' : 'Login'}</button> </small>

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

import React, { useRef, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { deleteCookie } from '../../services/cookieService';
import { elementDisplay, elementToggle, alterBgColor } from '../../Utils/utils';

// import gsap from "gsap";

/**
 * Renders Header with hero
 * @component
 */
const Header = () => {
  const headerRef = useRef<null | HTMLDivElement>();
  const mainMenuRef = useRef<null | HTMLUListElement>();
  const mainMenuToggleRef = useRef<null | HTMLButtonElement>();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [currentScrollPos, setCurrentScrollPos] = useState(null);
  const { authorized, setAuthorized } = useContext(AuthContext)


  // TOGGLE MENU
  const toggleMenu = () => {
    if (mainMenuRef.current.ariaHidden === 'false') {
      mainMenuRef.current.ariaHidden = 'true';
      mainMenuToggleRef.current.ariaExpanded = 'false'
    } else {
      mainMenuRef.current.ariaHidden = 'false';
      mainMenuToggleRef.current.ariaExpanded = 'true'
    }

    $('.main-menu ul').slideToggle(200, function () {
    });
  }

  // HIDE HEADER
  const hideMenu = () => {
    setCurrentScrollPos(window.scrollY)

    if (window.pageYOffset > 100) {
      if (prevScrollPos > currentScrollPos) {
        // Header
        elementToggle(headerRef.current, 'top', '0');
        headerRef.current.ariaHidden = 'false';

        // Menu
        elementDisplay(mainMenuRef.current, 'none');

        if (window.innerWidth <= 812) {
          // Toggle
          mainMenuToggleRef.current.ariaHidden = 'false';
        }
      } else {
        elementToggle(headerRef.current, 'top', '-120px');
        elementDisplay(mainMenuRef.current, 'none');
        headerRef.current.ariaHidden = 'true';
        mainMenuToggleRef.current.ariaHidden = 'true';
        mainMenuToggleRef.current.ariaExpanded = 'false';
        mainMenuRef.current.ariaHidden = 'true';

      }
    }
    setPrevScrollPos(currentScrollPos);
  }

  window.onresize = () => {
    if (window.innerWidth <= 812) {
      mainMenuToggleRef.current.ariaHidden = 'false';
      mainMenuToggleRef.current.ariaExpanded = 'false';
      mainMenuRef.current.ariaHidden = 'true'
    } else {
      mainMenuToggleRef.current.ariaHidden = 'true';
      mainMenuToggleRef.current.ariaExpanded = 'true';
      mainMenuRef.current.ariaHidden = 'false'
    }
  }

  // Hide header & to top on scroll
  window.onscroll = () => {
    hideMenu();
    alterBgColor(300, 'rgba(0, 0, 0, 0.6)', 'transparent', headerRef.current);
    // hideToTopBtn();
    // screen.width < 813 ? alterBgColor(300, 'rgba(0, 0, 0, 0.6)', 'transparent', mainMenu) : null;
  };

  const handleLogout = () => {
    setAuthorized(false)
    deleteCookie('jwt')
    // setFeedback({
    //   type: 'success',
    //   title: 'Logged Out',
    //   body: 'You have been logged out'
    // })
  }

  return (
    <header className="hero">
      <div className="header-content" ref={headerRef}>
        <nav className="main-menu">
          <button id="main-menu-toggle"
            ref={mainMenuToggleRef}
            aria-label="Toggle Mobile Menu"
            aria-expanded="false" aria-hidden="true"
            onClick={() => toggleMenu()}
          >
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="90" height="10" fill="#f7f7f7"></rect>
              <rect y="30" width="90" height="10" fill="#f7f7f7"></rect>
              <rect y="60" width="90" height="10" fill="#f7f7f7"></rect>
            </svg>
          </button>
          <ul id="menu-main-menu" ref={mainMenuRef} className="menu">
            <li><a href="#about-me" className="menu-link">About Me</a></li>
            <li><a href="#skillset" className="menu-link">Skillset</a></li>
            <li><a href="#resume" className="menu-link">Resume</a></li>
            <li><a href="#portfolio" className="menu-link">Portfolio</a></li>
            {authorized && <li><button className="menu-link" onClick={() => handleLogout()}>Log Out</button></li>}
          </ul>
        </nav>
        <div className="social">
          <a href="https://github.com/jona-laa/" target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub Link"><i
            className="fab fa-github fa-2x"></i></a>
          <a href="https://www.linkedin.com/in/jonathan-laasonen-974aa617a/" target="_blank" rel="noreferrer" className="icon-link"
            aria-label="LinkedIn Link"><i className="fab fa-linkedin fa-2x"></i></a>
        </div>
      </div>

      <div className="hero-content">
        <h1 className="title">Jonathan Laasonen</h1>
        <p className="tagline">Web Developer</p>
        <a href="#about-me" className="arrow-link" aria-label="Scroll to About Section"><i
          className="fas fa-chevron-down fa-3x"></i></a>
      </div>
    </header >
  )
}

export default Header;

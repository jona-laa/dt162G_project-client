import React from 'react'

const Header = () => {

  const toggleMenu = () => {
    // if (mainMenu.getAttribute('aria-hidden') == 'false') {
    //   mainMenu.setAttribute('aria-hidden', 'true');
    //   mainMenuToggle.setAttribute('aria-expanded', 'false');
    // } else {
    //   mainMenu.setAttribute('aria-hidden', 'false');
    //   mainMenuToggle.setAttribute('aria-expanded', 'true');
    // }

    $('.main-menu ul').slideToggle(200, function () {
    });
  }

  return (
    <header className="hero">
      <div className="header-content">
        <nav className="main-menu">
          <button id="main-menu-toggle" aria-label="Toggle Mobile Menu"
            aria-expanded="false" aria-hidden="true"
            onClick={() => toggleMenu()}
          >
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="90" height="10" fill="#f7f7f7"></rect>
              <rect y="30" width="90" height="10" fill="#f7f7f7"></rect>
              <rect y="60" width="90" height="10" fill="#f7f7f7"></rect>
            </svg>
          </button>
          <ul id="menu-main-menu" className="menu">
            <li><a href="#about-me" className="menu-link">About Me</a></li>
            <li><a href="#skillset" className="menu-link">Skillset</a></li>
            <li><a href="#resume" className="menu-link">Resume</a></li>
            <li><a href="#portfolio" className="menu-link">Portfolio</a></li>
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

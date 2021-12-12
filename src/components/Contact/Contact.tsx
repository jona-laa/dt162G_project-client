import React from 'react'

const Contact: React.FC = (): JSX.Element => {
  return (
    <section id="contact" className="section-padding">
      <h2>Get In Touch</h2>
      <div className="divider"></div>

      <div className="contact-icons">
        <a href="https://www.linkedin.com/in/jonathan-laasonen-974aa617a/" target="_blank" rel="noreferrer" className="icon-link"
          aria-label="LinkedIn Link"><i className="fab fa-linkedin fa-2x"></i></a>
        <a href="https://github.com/jona-laa/" target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub Link"><i
          className="fab fa-github fa-2x"></i></a>
        <a href="mailto:jona.laa.dev@gmail.com" target="_blank" rel="noreferrer" className="icon-link" aria-label="Send Email Link"><i
          className="fas fa-envelope fa-2x"></i></a>
      </div>

    </section>
  )
}

export default Contact;

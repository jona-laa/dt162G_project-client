import React from 'react'

/**
 * Renders Portfolio section
 * @component 
 */
const Portfolio: React.FC = (): JSX.Element => {
  return (
    <section id="portfolio" className="section-padding bg-dark">
      <h2>Portfolio</h2>
      <div className="divider"></div>

      <div className="row trio portfolio-container">
        {/* Portfolio items will render here */}
      </div>
    </section>
  )
}

export default Portfolio;

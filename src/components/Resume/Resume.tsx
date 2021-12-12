import React from 'react'
import Studies from './Studies/Studies'
import Work from './Work/Work'

/**
 * Renders Resume section with Work and Studies
 * @component
 */
const Resume: React.FC = (): JSX.Element => {
  return (
    <section id="resume" className="section-padding bg-light">
      <h2>Resume</h2>
      <div className="divider"></div>
      <Work />
      <div className="divider"></div>
      <Studies />
    </section>
  )
}

export default Resume

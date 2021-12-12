import React, { useEffect, useState } from 'react'
import me from '../../assets/images/me.jpg'

/**
 * Renders About section
 * @component
 */
const About: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [about, setAbout] = useState<Array<About>>([])

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch('http://localhost:4000/about')
      .then(res => res.json())
      .then(data => componentMounted && setAbout(data))
      .catch(error => console.log(`Error: ${error} fetching About data in component About.tsx`))
      .finally(() => componentMounted && setLoading(false))

    return () => {
      componentMounted = false;
    }
  }, [])

  return (
    <section id="about-me" className="section-padding bg-light">

      <div className="section-header">
        <h2>About Me</h2>
      </div>
      <div className="divider"></div>

      <div className="about-container">
        {/* About will render here */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="avatar-container">
              <div className="avatar"
                style={{
                  background: `url(${me}) no-repeat center center/cover`,
                  backgroundPosition: "center"
                }}
              ></div>
            </div>

            <div>
              <div>
                <h3>{about[0].heading}</h3>
                <p>{about[0].bio}</p>
              </div>
            </div>
          </>
        )}
      </div>

    </section >
  )
}

export default About

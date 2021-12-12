import React, { useEffect, useState } from 'react'

/**
 * Renders Portfolio section
 * @component 
 */
const Portfolio: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Array<Project>>([])

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch('http://localhost:4000/projects')
      .then(res => res.json())
      .then(data => componentMounted && setProjects(data))
      .catch(error => console.log(`Error: ${error} fetching Work data in component Work.tsx`))
      .finally(() => componentMounted && setLoading(false))

    return () => {
      componentMounted = false;
    }
  }, [])

  return (
    <section id="portfolio" className="section-padding bg-dark">
      <h2>Portfolio</h2>
      <div className="divider"></div>

      <div className="row trio portfolio-container">
        {loading ? (
          <div className="loader"></div>
        ) : (
          projects.map(project => (
            <a key={project._id} href={project.prj_url}
              rel="noreferrer" className="portfolio-item_link"
              target="_blank">
              <div
                className="portfolio-item"

                style={{
                  backgroundImage: `url(../../assets/images/Flipside.jpg)`,
                  // background: `url(../../assets/images/Flipside.jpg) no-repeat center center/cover`,
                  backgroundPosition: "center"
                }}
              >
                <div className="portfolio-item_overlay">
                  <div className="portfolio-item_content">
                    <h3>{project.title}</h3>
                    <p>{project.descr}</p>
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  )
}

export default Portfolio;

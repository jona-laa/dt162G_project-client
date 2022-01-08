import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { ContentContext } from '../../context/contentContext'
import AddItemButton from '../AddItemButton/AddItemButton'
import EditItemControls from '../EditItemControls/EditItemControls'

import flipside from '../../assets/images/Flipside.jpg'
import Loading from '../Loading/Loading'

/**
 * Renders Portfolio section
 * @component 
 */
const Portfolio: React.FC = (): JSX.Element => {
  const { authorized } = useContext(AuthContext)
  const { projects, setProjects } = useContext(ContentContext);
  const [loading, setLoading] = useState(true)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch('http://localhost:4000/api/content/projects')
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

      {authorized && <AddItemButton itemType={'project'} color={'white'} />}

      <div className="section-header">
        <h2>Portfolio</h2>
      </div>

      <div className="divider"></div>

      <div className="row trio portfolio-container">
        {loading ? (
          <Loading text={'Loading...'} textColor={'white'} />
        ) : (
          projects.map(project => (
            <div
              key={project._id}
              className="portfolio-item"
              style={{
                background: `url(${flipside}) no-repeat center center/cover`,
              }}
            >
              {/* EDIT CONTROLS IF LOGGED IN */}
              {authorized &&
                (<EditItemControls item={project} itemType={'project'} color={'white'} />)}
              <div className="portfolio-item_overlay">
                <a key={project._id} href={project.prj_url}
                  target="_blank"
                  rel="noreferrer" >
                  <div className="portfolio-item_content">
                    <h3>
                      {project.title}</h3>
                    <p>{project.descr}</p>
                  </div>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Portfolio;

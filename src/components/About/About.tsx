import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { ContentContext } from '../../context/contentContext'
import AddItemButton from '../AddItemButton/AddItemButton'
import Loading from '../Loading/Loading'
import { API_URL } from '../../constants'
import AboutItem from './AboutItem/AboutItem'

/**
 * Renders About section
 * @component
 */
const About: React.FC = (): JSX.Element => {
  const { authorized } = useContext(AuthContext)
  const { about, setAbout } = useContext(ContentContext);
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch(`${API_URL}/api/content/about`)
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

      {authorized && <AddItemButton itemType={'about'} color={'black'} />}

      <div className="section-header">
        <h2>About Me</h2>
      </div>
      <div className="divider"></div>

      <div className="about-container">
        {loading ? (
          <Loading text={'Loading...'} textColor={'black'} />
        ) : (
          about.map(about => (
            <AboutItem about={about} />
          ))
        )}
      </div>
    </section >
  )
}

export default About

import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { ContentContext } from '../../context/contentContext'
import AddItemButton from '../AddItemButton/AddItemButton'
import EditItemControls from '../EditItemControls/EditItemControls'
import Loading from '../Loading/Loading'
import { API_URL } from '../../constants'

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
            <div className="about-item" key={about._id}>
              {/* EDIT CONTROLS IF LOGGED IN */}
              {authorized &&
                (<EditItemControls item={about} itemType={'about'} color={'black'} />)}

              {/* AVATAR */}
              <div className="avatar-container">
                <div className="avatar"
                  style={{
                    background: `url('${API_URL}/api/content/images/${about.img_src}') no-repeat center center/cover`,
                    backgroundPosition: "center"
                  }}
                ></div>
              </div>

              {/* ABOUT SECTION */}
              <div>
                <div>
                  <h3>{about.heading}</h3>
                  {about?.bio?.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </div>
            </div>))
        )}
      </div>

    </section >
  )
}

export default About

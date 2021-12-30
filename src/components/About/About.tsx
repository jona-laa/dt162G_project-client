import React, { useEffect, useState, useContext } from 'react'
import me from '../../assets/images/me.jpg'
import { AuthContext } from '../../context/authContext'
import AddItemButton from '../AddItemButton/AddItemButton'
import EditItemControls from '../EditItemControls/EditItemControls'

/**
 * Renders About section
 * @component
 */
const About: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [about, setAbout] = useState<Array<About>>([])
  const { authorized } = useContext(AuthContext)

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

      {authorized && <AddItemButton itemType={'about'} color={'black'} />}

      <div className="section-header">
        <h2>About Me</h2>
      </div>
      <div className="divider"></div>

      <div className="about-container">

        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            {/* EDIT CONTROLS IF LOGGED IN */}
            {authorized && about.length > 0 &&
              (<EditItemControls item={about[0]} itemType={'about'} color={'black'} />)}

            {/* AVATAR */}
            <div className="avatar-container">
              <div className="avatar"
                style={{
                  background: `url(${me}) no-repeat center center/cover`,
                  backgroundPosition: "center"
                }}
              ></div>
            </div>

            {/* ABOUT SECTION */}
            <div>
              <div>
                <h3>{about[0].heading}</h3>
                {about[0].bio.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </div>
          </>
        )}
      </div>

    </section >
  )
}

export default About

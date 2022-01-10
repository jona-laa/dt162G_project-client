import React, { useEffect, useState, useContext } from 'react'
import skillsetBg from '../../assets/images/skillset-bg.jpg'
import AddItemButton from '../AddItemButton/AddItemButton'
import { AuthContext } from '../../context/authContext'
import { ContentContext } from '../../context/contentContext'
import EditItemControls from '../EditItemControls/EditItemControls'
import Loading from '../Loading/Loading'
import { API_URL } from '../../constants'

/**
 * Renders Skills section
 * @component
 */
const Skills: React.FC = (): JSX.Element => {
  const { authorized } = useContext(AuthContext)
  const { skills, setSkills } = useContext(ContentContext);
  const [loading, setLoading] = useState(true)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch(`${API_URL}/api/content/skills`)
      .then(res => res.json())
      .then(data => componentMounted && setSkills(data))
      .catch(error => console.log(`Error: ${error} fetching Skills data in component Skills.tsx`))
      .finally(() => componentMounted && setLoading(false))

    return () => {
      componentMounted = false;
    }
  }, [])

  return (
    <section id="skillset" className="bg-dark">

      {authorized && <AddItemButton itemType={'skill'} color={'white'} />}

      <h2>Skillset</h2>
      <div className="row duo">
        <div className="col">
          <img className="col-cover" src={skillsetBg} alt="" />
        </div>

        <div className="col">
          <div className="col-2">
            <h3 className="centered-heading">Some of My Skills</h3>
            <div className="skills-container">
              {/* Skills will render here */}
              {loading ? (
                <Loading text={'Loading...'} textColor={'white'} />
              ) : (
                skills.map(skill => (
                  <div
                    className="skill"
                    key={skill._id}
                  >
                    {/* EDIT CONTROLS IF LOGGED IN */}
                    {authorized &&
                      (<EditItemControls item={skill} itemType={'skill'} color={'white'} />)}
                    <i
                      className={skill.icon + ' fa-3x'}
                      aria-hidden="true"></i>
                    <span>{skill.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills;

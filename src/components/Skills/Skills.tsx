import React, { useEffect, useState } from 'react'
import skillsetBg from '../../assets/images/skillset-bg.jpg'

/**
 * Renders Skills section
 * @component
 */
const Skills: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [skills, setSkills] = useState<Array<Skill>>([])

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch('http://localhost:4000/skills')
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
                <div className="loader"></div>
              ) : (
                skills.map(skill => (
                  <div
                    className="skill"
                    key={skill._id}
                  >
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

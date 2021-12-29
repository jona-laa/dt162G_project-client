import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import AddItemButton from '../../AddItemButton/AddItemButton'
/**
 * Renders Work section
 * @component
 */
const Studies: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [studies, setStudies] = useState<Array<Course>>([])
  const { authorized } = useContext(AuthContext)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch('http://localhost:4000/studies')
      .then(res => res.json())
      .then(data => componentMounted && setStudies(data))
      .catch(error => console.log(`Error: ${error} fetching Work data in component Work.tsx`))
      .finally(() => componentMounted && setLoading(false))

    return () => {
      componentMounted = false;
    }
  }, [])

  return (
    <div className="studies-section">
      {authorized && <AddItemButton itemType={'studies'} color={'black'} />}
      <h3 className="centered-heading">Studies</h3>
      <div className="row trio studies">
        {loading ? (
          <div className="loader"></div>
        ) : (
          studies.map(course => (
            <div key={course._id} className="resume-item">
              <h4>{course.title}</h4>
              <span>{course.institution}</span><br />
              <span>{course.date_start.split('T')[0]} – {course.date_end.split('T')[0]}</span>
              <p>{course.descr}</p>
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default Studies;
import React, { useEffect, useState, useContext } from 'react'
import { API_URL } from '../../../constants'
import { AuthContext } from '../../../context/authContext'
import { ContentContext } from '../../../context/contentContext'
import AddItemButton from '../../AddItemButton/AddItemButton'
import EditItemControls from '../../EditItemControls/EditItemControls'
import Loading from '../../Loading/Loading'

/**
 * Renders Studies section
 * @component
 */
const Studies: React.FC = (): JSX.Element => {
  const { authorized } = useContext(AuthContext)
  const { studies, setStudies } = useContext(ContentContext);
  const [loading, setLoading] = useState(true)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch(`${API_URL}/api/content/studies`)
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
          <Loading text={'Loading...'} textColor={'black'} />
        ) : (
          studies.map(course => (
            <div key={course._id} className="resume-item">
              {/* EDIT CONTROLS IF LOGGED IN */}
              {authorized &&
                (<EditItemControls item={course} itemType={'studies'} color={'black'} />)}
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
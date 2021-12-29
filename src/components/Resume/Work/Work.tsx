import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import AddItemButton from '../../AddItemButton/AddItemButton'

/**
 * Renders Work section
 * @component
 */
const Work: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [work, setWork] = useState<Array<Work>>([])
  const { authorized } = useContext(AuthContext)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch('http://localhost:4000/work')
      .then(res => res.json())
      .then(data => componentMounted && setWork(data))
      .catch(error => console.log(`Error: ${error} fetching Work data in component Work.tsx`))
      .finally(() => componentMounted && setLoading(false))

    return () => {
      componentMounted = false;
    }
  }, [])

  return (
    <div className="work-section">
      {authorized && <AddItemButton itemType={'work'} color={'black'} />}
      <h3 className="centered-heading">Work</h3>
      <div className="row trio work">
        {loading ? (
          <div className="loader"></div>
        ) : (
          work.map(job => (
            <div key={job._id} className="resume-item">
              <h4>{job.company}</h4>
              <span>{job.title}</span><br />
              <span>{job?.date_start?.split('T')[0]} – {job?.date_end?.split('T')[0]}</span>
              <p>{job.descr}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Work;
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import { ContentContext } from '../../../context/contentContext'
import AddItemButton from '../../AddItemButton/AddItemButton'
import EditItemControls from '../../EditItemControls/EditItemControls'
import loader from '../../../assets/images/loader.gif'
import Loading from '../../Loading/Loading'
import { API_URL } from '../../../constants'

/**
 * Renders Work section
 * @component
 */
const Work: React.FC = (): JSX.Element => {
  const { authorized } = useContext(AuthContext)
  const { work, setWork } = useContext(ContentContext);
  const [loading, setLoading] = useState(true)

  // Fetch About posts
  useEffect(() => {
    let componentMounted: boolean = true;

    fetch(`${API_URL}/api/content/work`)
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
          <Loading text={'Loading...'} textColor={'black'} />
        ) : (
          work.map(job => (
            <div key={job._id} className="resume-item">
              {/* EDIT CONTROLS IF LOGGED IN */}
              {authorized &&
                (<EditItemControls item={job} itemType={'work'} color={'black'} />)}
              <h4>{job.company}</h4>
              <span>{job.title}</span><br />
              <span>{job?.date_start?.split('T')[0]} – {job.date_end ? job?.date_end?.split('T')[0] : 'current'}</span>
              <p>{job.descr}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Work;
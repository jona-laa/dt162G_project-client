import React, { useEffect, useState } from 'react'

/**
 * Renders Work section
 * @component
 */
const Work: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [work, setWork] = useState<Array<Work>>([])

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
    <>
      <h3 className="centered-heading">Work</h3>
      <div className="row trio work">
        {loading ? (
          <div className="loader"></div>
        ) : (
          work.map(job => (
            <div className="resume-item">
              <h4>{job.company}</h4>
              <span>{job.title}</span><br />
              <span>{job.date_start} – {job.date_end}</span>
              <p>{job.descr}</p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Work;
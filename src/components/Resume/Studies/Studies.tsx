import React, { useEffect, useState } from 'react'

/**
 * Renders Work section
 * @component
 */
const Studies: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [studies, setStudies] = useState<Array<Studies>>([])

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
    <>
      <h3 className="centered-heading">Studies</h3>
      <div className="row trio studies">
        {loading ? (
          <div className="loader"></div>
        ) : (
          studies.map(course => (
            <div className="resume-item">
              <h4>{course.institution}</h4>
              <span>{course.title}</span><br />
              <span>{course.date_start} – {course.date_end}</span>
              <p>{course.descr}</p>
            </div>
          ))
        )}

      </div>
    </>
  )
}

export default Studies;
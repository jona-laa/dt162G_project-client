import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import EditItemControls from '../../EditItemControls/EditItemControls'
import { API_URL } from '../../../constants'
import { AuthContext } from '../../../context/authContext'

interface AboutProps {
  about: About
}

const AboutItem: React.FC<AboutProps> = ({ about }): JSX.Element => {
  const { authorized } = useContext(AuthContext)

  return (
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
    </div>
  )
}

AboutItem.propTypes = {
  // about: PropTypes.object.isRequired
}

export default AboutItem

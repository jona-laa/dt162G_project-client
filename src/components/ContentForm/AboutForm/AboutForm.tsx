import React, { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../../context/authContext';
import { ContentContext } from '../../../context/contentContext';
import { FeedbackContext } from '../../../context/feedbackContext';
import axios from 'axios';
import { API_URL } from '../../../constants';

const AboutForm = () => {
  // App State - Context
  const {
    addItemType,
    setAddItemType,
    updateItemType,
    setUpdateItemType,
    updateItem,
    about,
    setAbout
  } = useContext(ContentContext);
  const { authToken } = useContext(AuthContext);
  const { setFeedback } = useContext(FeedbackContext);
  // Component State - Input Values
  const [headingInput, setHeadingInput] = useState<string>('');
  const [bioInput, setBioInput] = useState<string>('');
  const [imageNameInput, setImageNameInput] = useState<string>('');
  const [imageFile, setImageFile] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState({})
  // Component State - Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-fill inputs on update form render
  useEffect(() => {
    let componentMounted = true;
    if (updateItemType) {
      componentMounted && setHeadingInput(updateItem.heading);
      componentMounted && setBioInput(updateItem.bio);
      componentMounted && setImageNameInput(updateItem.img_src);
    }

    return () => {
      componentMounted = false;
    }
  }, [])

  const submitFiles = async () => {
    const formData = new FormData();
    formData.append('file', imageFile)

    try {
      const res = await axios.post(`${API_URL}/api/content/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'jwt': authToken
        }
      })

      const { fileName, filePath } = res.data;
      setUploadedImage({ fileName, filePath })
    } catch (error) {
      if (error.response.status === 500) {
        setFeedback({
          type: 'error',
          message: 'There was a problem uploading the image.'
        })
      } else {
        setFeedback({
          type: 'error',
          message: error.response.data.message
        })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setFormError(null);
    e.preventDefault()

    submitFiles();

    const updateBody = {
      _id: updateItem?._id,
      heading: headingInput,
      bio: bioInput,
      img_src: imageNameInput,
    }

    const postBody = {
      heading: headingInput,
      bio: bioInput,
      img_src: imageNameInput,
    }

    fetch(`${API_URL}/api/content/about`, {
      method: updateItemType ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'jwt': authToken
      },
      body: JSON.stringify(updateItemType ? updateBody : postBody),
    })
      .then(res => {
        if (res.status === 200) {
          handleClose();
        }
        return res.json()
      })
      .then(data => {
        if (!updateItemType && !data.error) {
          setAbout([...about, data])
          setFeedback({
            type: 'success',
            message: 'New about item created!'
          })
        }
        else if (updateItemType && !data.error) {
          const aboutCopy = [...about];
          const itemToUpdate = aboutCopy.filter(item => item._id === data?._id)[0];
          itemToUpdate.bio = data.bio;
          itemToUpdate.heading = data.heading;
          itemToUpdate.img_src = data.img_src;
          setAbout(aboutCopy)
          setFeedback({
            type: 'success',
            message: 'About item updated!'
          })
        }
        else {
          setFormError(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFeedback({
          type: 'error',
          message: 'Something went wrong. Try again.'
        })
      });
  }

  const handleClose = () => {
    setAddItemType(null);
    setUpdateItemType(null);
  }

  const onFileInputChange = (e) => {
    setImageFile(e?.target?.files[0]);
    setImageNameInput(e?.target?.files[0]?.name);
  }

  return (
    <div className="overlay">
      <div className="content-form-container">
        <button onClick={() => handleClose()} className="close-btn" aria-label='close content window'><i className="fas fa-window-close"></i></button>

        <form action="" className="content-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <legend className="content-form__legend">
              {addItemType ? `Create ${addItemType}` : `Update ${updateItemType}`}
            </legend>

            <label htmlFor="heading" className="content-form__label">Heading</label>
            <br />
            <input
              type="text"
              id="heading-input"
              name="heading"
              autoComplete="true"
              autoFocus
              className="content-form__input"
              value={headingInput}
              onChange={(e) => setHeadingInput(e.target.value)}
            />
            <br />

            <label htmlFor="bio" className="content-form__label">Bio</label>
            <br />
            <textarea
              id="bio-input"
              name="bio"
              className="content-form__input"
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
            >
            </textarea>
            <br />

            <label htmlFor="image-file" className="content-form__label">Image</label>
            <br />
            <input
              type="file"
              id="image-file-input"
              name="image-file"
              className="content-form__input"
              onChange={(e) => onFileInputChange(e)}
            />
            <br />

            <input type="submit" value="Submit" className="content-form__submit-btn" />
          </fieldset>

          {formError && (<div className="form-feedback">
            {formError.split(',').map((error, index) => (
              <p key={index} className="form-feedback__text">{error}</p>
            ))}
          </div>)}
        </form>

      </div>
    </div>
  )
}

export default AboutForm;
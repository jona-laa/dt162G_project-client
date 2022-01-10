import React, { useState, useContext, useEffect } from 'react';
import { ContentContext } from '../../../context/contentContext';
import { AuthContext } from '../../../context/authContext';
import { FeedbackContext } from '../../../context/feedbackContext';
import axios from 'axios';
import { API_URL } from '../../../constants';

const ProjectsForm = () => {
  // App State - Context
  const {
    addItemType,
    setAddItemType,
    updateItemType,
    setUpdateItemType,
    updateItem,
    projects,
    setProjects
  } = useContext(ContentContext);
  const { authToken } = useContext(AuthContext);
  const { setFeedback } = useContext(FeedbackContext);
  // Component State - Input Values
  const [titleInput, setTitleInput] = useState<string>('');
  const [projectUrlInput, setProjectUrlInput] = useState<string>('');
  const [imageNameInput, setImageNameInput] = useState<string>('');
  const [imageFile, setImageFile] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState({})
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  // Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-fill inputs on update form render
  useEffect(() => {
    let componentMounted = true;
    if (updateItemType) {
      componentMounted && setTitleInput(updateItem.title);
      componentMounted && setProjectUrlInput(updateItem.prj_url);
      componentMounted && setImageNameInput(updateItem.img_src);
      componentMounted && setDescriptionInput(updateItem.descr);
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
        console.log('There was an internal server error')
      } else {
        console.log(error.response.data.message)
      }
    }
  }

  const onFileInputChange = (e) => {
    setImageFile(e?.target?.files[0]);
    setImageNameInput(e?.target?.files[0]?.name);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    submitFiles();

    const updateBody = {
      _id: updateItem?._id,
      title: titleInput,
      prj_url: projectUrlInput,
      img_src: imageNameInput,
      descr: descriptionInput,
    }

    const postBody = {
      title: titleInput,
      prj_url: projectUrlInput,
      img_src: imageNameInput,
      descr: descriptionInput,
    }

    fetch(`${API_URL}/api/content/projects`, {
      method: updateItemType ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'jwt': authToken
      },
      body: JSON.stringify(updateItemType ? updateBody : postBody),
    })
      .then(res => res.json())
      .then(data => {
        if (!updateItemType && !data.error) {
          setProjects([...projects, data])
          handleClose();
          setFeedback({
            type: 'success',
            message: 'New projects item created!'
          })
        }
        else if (updateItemType && !data.error) {
          const projectsCopy = [...projects];
          const itemToUpdate = projectsCopy.filter(item => item._id === data?._id)[0];
          itemToUpdate.title = data.title;
          itemToUpdate.descr = data.descr;
          itemToUpdate.prj_url = data.prj_url;
          itemToUpdate.img_src = data.img_src;

          setProjects(projectsCopy)
          handleClose();
          setFeedback({
            type: 'success',
            message: 'Projects item updated!'
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

  return (
    <div className="overlay">
      <div className="content-form-container">
        <button onClick={() => handleClose()} className="close-btn" aria-label='close content window'><i className="fas fa-window-close"></i></button>

        <form action="" className="content-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <legend className="content-form__legend">
              {addItemType ? `Create ${addItemType}` : `Update ${addItemType}`}
            </legend>

            <label htmlFor="title" className="content-form__label">Title</label>
            <br />
            <input
              type="text"
              id="title-input"
              name="title"
              autoComplete="true"
              className="content-form__input"
              value={titleInput}
              autoFocus
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <br />

            <label htmlFor="url" className="content-form__label">Project URL</label>
            <br />
            <input
              type="text"
              id="url-input"
              name="url"
              autoComplete="true"
              className="content-form__input"
              value={projectUrlInput}
              onChange={(e) => setProjectUrlInput(e.target.value)}
            />
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

            <label htmlFor="description" className="content-form__label">Description</label>
            <br />
            <textarea
              id="descr-input"
              name="description"
              className="content-form__input"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            >
            </textarea>
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

export default ProjectsForm;
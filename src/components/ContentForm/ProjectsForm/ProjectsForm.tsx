import React, { useState, useContext, useEffect } from 'react'
import { ContentContext } from '../../../context/contentContext';


const ProjectsForm = () => {
  const { addItemType, setAddItemType, updateItemType, setUpdateItemType, updateItem } = useContext(ContentContext);
  // Input Values
  const [titleInput, setTitleInput] = useState<string>('');
  const [projectUrlInput, setProjectUrlInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  // Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-fill inputs on update form render
  useEffect(() => {
    let componentMounted = true;
    if (updateItemType) {
      componentMounted && setTitleInput(updateItem.title);
      componentMounted && setProjectUrlInput(updateItem.prj_url);
      componentMounted && setImageInput(updateItem.img_src);
      componentMounted && setDescriptionInput(updateItem.descr);
    }

    return () => {
      componentMounted = false;
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updateBody = {
      _id: updateItem?._id,
      title: titleInput,
      prj_url: projectUrlInput,
      img_src: imageInput,
      descr: descriptionInput,
    }

    const postBody = {
      title: titleInput,
      prj_url: projectUrlInput,
      img_src: imageInput,
      descr: descriptionInput,
    }

    fetch(`http://localhost:4000/projects`, {
      method: updateItemType ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateItemType ? updateBody : postBody),
    })
      .then(res => {
        if (res.status === 200) {
          handleClose();
          // setFeedback({
          //   type: 'success',
          //   title: 'Success!',
          //   body: 'New work item created!'
          // })
        }
        return res.json()
      })
      .then(data => {
        data.errors && setFormError(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
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

            <label htmlFor="image" className="content-form__label">Image</label>
            <br />
            <input
              type="text"
              id="image-input"
              name="image"
              autoComplete="true"
              className="content-form__input"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
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
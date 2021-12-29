import React, { useState, useContext } from 'react'
import { ContentContext } from '../../../context/contentContext';

const ProjectsForm = () => {
  const { addItem, setAddItem } = useContext(ContentContext);
  // Input Values
  const [titleInput, setTitleInput] = useState<string>('');
  const [projectUrlInput, setProjectUrlInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(`http://localhost:4000/projects`, {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleInput,
        project_url: projectUrlInput,
        img_src: imageInput,
        descr: descriptionInput,
      }),
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleClose = () => {
    setAddItem(null);
    setTitleInput('')
    setProjectUrlInput('')
    setImageInput('')
    setDescriptionInput('')
  }

  return (
    <div className="overlay">
      <div className="content-form-container">
        <button onClick={() => handleClose()} className="close-btn" aria-label='close content window'><i className="fas fa-window-close"></i></button>

        <form action="" className="content-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <legend className="content-form__legend">
              {addItem ? `Create ${addItem}` : `Update ${addItem}`}
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

          <div className="form-feedback">
            <p className="form-feedback__text">Content is missing</p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ProjectsForm;
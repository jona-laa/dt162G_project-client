import React, { useState, useContext } from 'react'
import { ContentContext } from '../../../context/contentContext';

const SkillsForm = () => {
  const { addItem, setAddItem } = useContext(ContentContext);
  // Input Values
  const [nameInput, setNameInput] = useState<string>('');
  const [iconInput, setIconInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(`http://localhost:4000/skills`, {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput,
        icon: iconInput,
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
    setNameInput('')
    setIconInput('')
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

            <label htmlFor="name" className="content-form__label">Name</label>
            <br />
            <input
              type="text"
              id="name-input"
              name="name"
              autoComplete="true"
              autoFocus
              className="content-form__input"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <br />

            <label htmlFor="icon" className="content-form__label">Icon</label>
            <br />
            <input
              type="text"
              id="icon-input"
              name="icon"
              autoComplete="true"
              className="content-form__input"
              value={iconInput}
              onChange={(e) => setIconInput(e.target.value)}
            />
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

export default SkillsForm;
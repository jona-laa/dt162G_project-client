import React, { useState, useContext } from 'react'
import { ContentContext } from '../../../context/contentContext';

const WorkForm = () => {
  const { addItem, setAddItem } = useContext(ContentContext);
  // Input Values
  const [companyInput, setCompanyInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [dateStartInput, setDateStartInput] = useState<string>('');
  const [dateEndInput, setDateEndInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(`http://localhost:4000/work`, {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company: companyInput,
        title: titleInput,
        date_start: dateStartInput,
        date_end: dateEndInput,
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
    setCompanyInput('')
    setTitleInput('')
    setDateEndInput('')
    setDateStartInput('')
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

            <label htmlFor="company" className="content-form__label">Company</label>
            <br />
            <input
              type="text"
              id="company-input"
              name="company"
              autoComplete="true"
              autoFocus
              className="content-form__input"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
            />
            <br />

            <label htmlFor="title" className="content-form__label">Title</label>
            <br />
            <input
              type="text"
              id="title-input"
              name="title"
              autoComplete="true"
              className="content-form__input"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <br />

            <label htmlFor="end" className="content-form__label">Date Start</label>
            <br />
            <input
              type="date"
              id="start-input"
              name="start"
              autoComplete="true"
              className="content-form__input"
              value={dateStartInput}
              onChange={(e) => setDateStartInput(e.target.value)}
            />
            <br />

            <label htmlFor="end" className="content-form__label">Date End</label>
            <br />
            <input
              type="date"
              id="end-input"
              name="end"
              autoComplete="true"
              className="content-form__input"
              value={dateEndInput}
              onChange={(e) => setDateEndInput(e.target.value)}
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

export default WorkForm;
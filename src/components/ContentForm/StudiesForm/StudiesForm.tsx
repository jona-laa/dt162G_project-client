import React, { useState, useContext, useEffect } from 'react';
import { ContentContext } from '../../../context/contentContext';
import { AuthContext } from '../../../context/authContext';
import { FeedbackContext } from '../../../context/feedbackContext';
import { API_URL } from '../../../constants';

const StudiesForm = () => {
  // App State - Context
  const {
    addItemType,
    setAddItemType,
    updateItemType,
    setUpdateItemType,
    updateItem,
    studies,
    setStudies
  } = useContext(ContentContext);
  const { authToken } = useContext(AuthContext);
  const { setFeedback } = useContext(FeedbackContext);
  // Component State - Input Values
  const [institutionInput, setInstitutionInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [dateStartInput, setDateStartInput] = useState<string>('');
  const [dateEndInput, setDateEndInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  // Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-fill inputs on update form render
  useEffect(() => {
    let componentMounted = true;
    if (updateItemType) {
      componentMounted && setInstitutionInput(updateItem.institution);
      componentMounted && setTitleInput(updateItem.title);
      componentMounted && setDateStartInput(updateItem?.date_start.split('T')[0]);
      componentMounted && setDateEndInput(updateItem.date_end ? updateItem.date_end.split('T')[0] : '');
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
      institution: institutionInput,
      title: titleInput,
      date_start: dateStartInput,
      date_end: dateEndInput,
      descr: descriptionInput,
    }

    const postBody = {
      institution: institutionInput,
      title: titleInput,
      date_start: dateStartInput,
      date_end: dateEndInput,
      descr: descriptionInput,
    }

    fetch(`${API_URL}/api/content/studies`, {
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
          setStudies([...studies, data])
          setFeedback({
            type: 'success',
            message: 'New studies item created!'
          })
        }
        else if (updateItemType && !data.error) {
          const studiesCopy = [...studies];
          const itemToUpdate = studiesCopy.filter(item => item._id === data?._id)[0];
          itemToUpdate.institution = data.institution;
          itemToUpdate.title = data.title;
          itemToUpdate.date_start = data.date_start;
          itemToUpdate.date_end = data.date_end;
          itemToUpdate.descr = data.descr;

          setStudies(studiesCopy)
          setFeedback({
            type: 'success',
            message: 'Studies item updated!'
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
    setInstitutionInput('')
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
              {addItemType ? `Create ${addItemType}` : `Update ${updateItemType}`}
            </legend>

            <label htmlFor="institution" className="content-form__label">Institution</label>
            <br />
            <input
              type="text"
              id="institution-input"
              name="institution"
              autoComplete="true"
              autoFocus
              className="content-form__input"
              value={institutionInput}
              onChange={(e) => setInstitutionInput(e.target.value)}
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

export default StudiesForm;
import React, { useState, useContext, useEffect } from 'react'
import { ContentContext } from '../../../context/contentContext';
import { AuthContext } from '../../../context/authContext';

const WorkForm = () => {
  // App State - Context
  const {
    addItemType,
    setAddItemType,
    updateItemType,
    setUpdateItemType,
    updateItem,
    work,
    setWork
  } = useContext(ContentContext);
  const { authToken } = useContext(AuthContext);
  // Component State - Input Values
  const [companyInput, setCompanyInput] = useState<string>('');
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
      componentMounted && setCompanyInput(updateItem.company);
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
      company: companyInput,
      title: titleInput,
      date_start: dateStartInput,
      date_end: dateEndInput,
      descr: descriptionInput,
    }

    const postBody = {
      company: companyInput,
      title: titleInput,
      date_start: dateStartInput,
      date_end: dateEndInput,
      descr: descriptionInput,
    }

    fetch(`http://localhost:4000/api/content/work`, {
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
          setWork([...work, data])
          // setFeedback({
          //   type: 'success',
          //   title: 'Success!',
          //   body: 'New about item created!'
          // })
        }
        else if (updateItemType && !data.error) {
          const workCopy = [...work];
          const itemToUpdate = workCopy.filter(item => item._id === data?._id)[0];
          itemToUpdate.company = data.company;
          itemToUpdate.title = data.title;
          itemToUpdate.date_start = data.date_start;
          itemToUpdate.date_end = data.date_end;
          itemToUpdate.descr = data.descr;

          setWork(workCopy)
          // setFeedback({
          //   type: 'success',
          //   title: 'Success!',
          //   body: 'Item Updated!'
          // })
        }
        else {
          setFormError(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // setFeedback({
        //   type: 'error',
        //   title: 'Oops...',
        //   body: 'Something went wrong. Try again.'
        // })
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
              {addItemType ? `Create ${addItemType}` : `Update ${updateItemType}`}
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

export default WorkForm;
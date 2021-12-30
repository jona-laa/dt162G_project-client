import React, { useState, useContext, useEffect } from 'react'
import { ContentContext } from '../../../context/contentContext';

const SkillsForm = () => {
  const { addItemType, setAddItemType, updateItemType, setUpdateItemType, updateItem } = useContext(ContentContext);
  // Input Values
  const [nameInput, setNameInput] = useState<string>('');
  const [iconInput, setIconInput] = useState<string>('');

  // Auto-fill inputs on update form render
  useEffect(() => {
    let componentMounted = true;
    if (updateItemType) {
      componentMounted && setNameInput(updateItem.name);
      componentMounted && setIconInput(updateItem.icon);
    }

    return () => {
      componentMounted = false;
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updateBody = {
      _id: updateItem?._id,
      name: nameInput,
      icon: iconInput,
    }

    const postBody = {
      name: nameInput,
      icon: iconInput,
    }

    fetch(`http://localhost:4000/skills`, {
      method: updateItemType ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateItemType ? updateBody : postBody),
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
    setAddItemType(null);
    setUpdateItemType(null);
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
              {addItemType ? `Create ${addItemType}` : `Update ${updateItemType}`}
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
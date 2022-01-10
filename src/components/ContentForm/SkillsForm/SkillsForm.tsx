import React, { useState, useContext, useEffect } from 'react';
import { API_URL } from '../../../constants';
import { AuthContext } from '../../../context/authContext';
import { ContentContext } from '../../../context/contentContext';
import { FeedbackContext } from '../../../context/feedbackContext';

const SkillsForm = () => {
  // App State - Context
  const {
    addItemType,
    setAddItemType,
    updateItemType,
    setUpdateItemType,
    updateItem,
    skills,
    setSkills
  } = useContext(ContentContext);
  const { authToken } = useContext(AuthContext);
  const { setFeedback } = useContext(FeedbackContext);
  // Component State - Input Values
  const [nameInput, setNameInput] = useState<string>('');
  const [iconInput, setIconInput] = useState<string>('');
  // Component State - Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

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

  console.log(authToken)

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

    fetch(`${API_URL}/api/content/skills`, {
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
        console.log(data)
        if (!updateItemType && !data.error) {
          setSkills([...skills, data])
          setFeedback({
            type: 'success',
            message: 'New skills item created!'
          })
        }
        else if (updateItemType && !data.error) {
          const skillsCopy = [...skills];
          const itemToUpdate = skillsCopy.filter(item => item._id === data?._id)[0];
          itemToUpdate.name = data.name;
          itemToUpdate.icon = data.icon;
          setSkills(skillsCopy)
          setFeedback({
            type: 'success',
            message: 'Skills item updated!'
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

export default SkillsForm;
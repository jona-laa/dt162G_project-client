import React, { useState, useContext, useEffect } from 'react'
import { ContentContext } from '../../../context/contentContext';

const AboutForm = () => {
  const { addItemType, setAddItemType, updateItemType, setUpdateItemType, updateItem } = useContext(ContentContext);
  // Input Values
  const [headingInput, setHeadingInput] = useState<string>('');
  const [bioInput, setBioInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');
  // Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-fill inputs on update form render
  useEffect(() => {
    let componentMounted = true;
    if (updateItemType) {
      componentMounted && setHeadingInput(updateItem.heading);
      componentMounted && setBioInput(updateItem.bio);
      componentMounted && setImageInput(updateItem.img_src);
    }

    return () => {
      componentMounted = false;
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updateBody = {
      _id: updateItem?._id,
      heading: headingInput,
      bio: bioInput,
      img_src: imageInput,
    }

    const postBody = {
      heading: headingInput,
      bio: bioInput,
      img_src: imageInput,
    }

    fetch(`http://localhost:4000/api/content/about`, {
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

            <label htmlFor="image" className="content-form__label">Image</label>
            <br />
            <input
              type="text"
              id="image-input"
              name="image"
              className="content-form__input"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
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
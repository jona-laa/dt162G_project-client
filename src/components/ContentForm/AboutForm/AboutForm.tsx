import React, { useState, useContext, useEffect } from 'react'
import { ContentContext } from '../../../context/contentContext';

const AboutForm = () => {
  const { addItemType, setAddItemType, updateItemType, setUpdateItemType, updateItem } = useContext(ContentContext);
  // Input Values
  const [headingInput, setHeadingInput] = useState<string>('');
  const [bioInput, setBioInput] = useState<string>('');
  const [imageInput, setImageInput] = useState<string>('');

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

    fetch(`http://localhost:4000/about`, {
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
    setHeadingInput('')
    setBioInput('')
    setImageInput('')
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

          <div className="form-feedback">
            <p className="form-feedback__text">Content is missing</p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AboutForm;
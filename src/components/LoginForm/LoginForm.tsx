import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

const LoginForm: React.FC = (): JSX.Element => {
  const { setAuthorized, setAuthToken, authToken, loginFormVisible, setLoginFormVisible } = useContext(AuthContext);

  // Input Values
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  // Form error feedback
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(`http://localhost:4000/api/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput
      }),
    })
      .then(res => {
        if (res.status === 200) {
          setAuthorized(true);
          setLoginFormVisible(!loginFormVisible)
        }
        return res.json()
      })
      .then(data => {
        data.jwt && setAuthToken(data.jwt);
        data.errors && setFormError(data.errors);
        console.log(data.jwt)
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

  return loginFormVisible ? (
    <div className="overlay">

      <div className="login-container">
        <button onClick={() => setLoginFormVisible(!loginFormVisible)} className="close-btn" aria-label='close login window'><i className="fas fa-window-close"></i></button>
        <form action="" className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <legend className="login-form__legend">Log In</legend>
            <label htmlFor="username" className="login-form__label">Username</label><br />
            <input
              type="username"
              id="username"
              name="username"
              autoComplete="true"
              autoFocus
              className="login-form__input"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <br />
            <label htmlFor="password" className="login-form__label">Password</label><br />
            <input
              type="password"
              id="password"
              name="password"
              className="login-form__input"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <br />
            <input type="submit" value="Log In" className="login-form__submit-btn" />
          </fieldset>

          {formError && (<div className="form-feedback">
            <p className="form-feedback__text">{formError}</p>
          </div>)}
        </form>
      </div>
    </div>
  ) : null
}

export default LoginForm;

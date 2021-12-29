import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const LoginForm: React.FC = (): JSX.Element => {
  const { setAuthorized, loginFormVisible, setLoginFormVisible } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthorized(true);
    setLoginFormVisible(!loginFormVisible)
  }

  return loginFormVisible ? (
    <div className="overlay">

      <div className="login-container">
        <button onClick={() => setLoginFormVisible(!loginFormVisible)} className="close-btn" aria-label='close login window'><i className="fas fa-window-close"></i></button>
        <form action="" className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <legend className="login-form__legend">Log In</legend>
            <label htmlFor="email" className="login-form__label">Username</label><br />
            <input type="email" id="email" name="email" autoComplete="true" autoFocus className="login-form__input" /><br />
            <label htmlFor="password" className="login-form__label">Password</label><br />
            <input type="password" id="password" name="password" className="login-form__input" /><br />
            <input type="submit" value="Log In" className="login-form__submit-btn" />
          </fieldset>

          <div className="login-feedback">
            <p className="login-feedback__text">Username or password is wrong</p>
          </div>
        </form>
      </div>
    </div>
  ) : null
}

export default LoginForm;

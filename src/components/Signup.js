import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../style_components/login.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/; // Allow only letters, numbers, and underscores, 3-16 characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum eight characters, at least one letter and one number

  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { toggleAuth, toggleTempuser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    try {
      if (!usernameRegex.test(username)) {
        setUsernameError('Invalid username. Please use letters, numbers, and underscores, between 3 and 16 characters.');
        return;
      }

      if (!emailRegex.test(email)) {
        setEmailError('Invalid email address.');
        return;
      }

      if (!passwordRegex.test(password)) {
        setPasswordError('Please use at least six characters, including one letter and one number.');
        return;
      }

      const response = await axios.post('https://radiantrides-backend.onrender.com/users/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorData = error.response.data;

          if (errorData.field === 'username') {
            setUsernameError(errorData.message);
          } else if (errorData.field === 'email') {
            setEmailError(errorData.message);
          } else if (errorData.field === 'password') {
            setPasswordError(errorData.message);
          }
        }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toggleAuth();
    toggleTempuser('');
    window.location.reload();
  };

  return (
    <section className="signup">
      <div className="container2">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            {!isAuthenticated ? (
              <form>
                <div className="form-group">
                <label
                  className={usernameError ? 'error-label' : ''}
                >
                    <FontAwesomeIcon icon={faUser} />
                </label>
                  <input
                    className='inputusername'
                    name="name"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && <div className="error-message">{usernameError}</div>}
                </div>
                <div className="form-group">
                  <label
                    className={emailError ? 'error-label' : ''}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <div className="error-message">{emailError}</div>}
                </div>
                <div className="form-group">
                  <label
                    className={passwordError ? 'error-label' : ''}
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div className="form-group form-button">
                  <button
                    type="button"
                    className="form-submit"
                    onClick={handleSignup}
                  >
                    Register
                  </button>
                </div>
            </form>
            ) : (
              <div>
                <p>You are already logged in. Click the button below to log out.</p>
                <button
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
          <div className="signup-image">
            <figure>
              <img src="/images/three.webp" alt="signup" />
            </figure>
            <Link to="/login" className="signup-image-link">
              I am already a member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;

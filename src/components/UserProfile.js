import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'; 
import '../style_components/UserProfile.css';

function UserProfile() {
  const { tempuser, isAuthenticated, toggleAuth, toggleTempuser } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const updateUsername = async () => {
    try {
      const response = await axios.patch('https://radiantrides-backend.onrender.com/users/update', {
        username: tempuser,
        newUsername: newUsername,
      });

      if (response.status === 200) {
        setValidationMessage('Username updated successfully');
        toggleTempuser(newUsername);
        toggleAuth();
        navigate('/login');
      }
    } catch (error) {
      setValidationMessage('Username is not available');
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete('https://radiantrides-backend.onrender.com/users/delete', {
        data: { username: tempuser },
      });

      if (response.status === 200) {
        localStorage.clear();
        toggleAuth();
        toggleTempuser('');
        navigate('/signup');
      } else if (response.status === 400) {
        if (response.data && response.data.error) {
          alert(response.data.error);
        } else {
          console.warn('Unexpected 400 response:', response);
        }
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleUpdateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(newUsername)) {
      setValidationMessage(
        'Invalid username. Please use 3-16 characters, only letters, numbers, and underscores.'
      );
      return;
    }

    if (newUsername.trim() !== '') {
      updateUsername();
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    deleteAccount();
    setShowDeleteModal(false);
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="user-profile-container">
      {isAuthenticated ? (
        <div className="user-profile-content">
          <div className="left-section">
            <div className="profile-heading">User Profile</div>
            <div className="current-username">Current Username: {tempuser}</div>
            <div className="update-username-container">
              <label htmlFor="new-username" className="new-username-label">
                New Username:
              </label>
              <input
                type="text"
                id="new-username"
                className="new-username-input"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                  setValidationMessage(''); 
                }}
              />
              {validationMessage && (
                <div className="validation-message">{validationMessage}</div>
              )}
              <button className="update-username-button" onClick={handleUpdateUsername}>
                Update Username
              </button>
            </div>
          </div>
          <div className="right-section">
            <div className="delete-account-container">
              <p>Deleting your account will remove all your data permanently.</p>
              <button className="btn btn-danger delete-account-button" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>User is not logged in</p>
          <Link to="/login" className="btn btn-primary">
            Log in
          </Link>
        </div>
      )}

      
      <Modal show={showDeleteModal} onHide={cancelDeleteAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account?
          </p>
          <p className="text-danger font-weight-bold">
            This action is irreversible and will permanently remove your account and all associated data.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cancelDeleteAccount}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmDeleteAccount}>
            Delete Account
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserProfile;

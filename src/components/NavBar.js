import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, tempuser, roles, toggleAuth, toggleTempuser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toggleAuth();
    toggleTempuser('');
    navigate('/');
  };

  const isAdmin = roles.includes('Admin');

  return (
    <div style={{ marginBottom: '80px' }}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',maxHeight:'50px' }}>
            <div>
              <Link to="/" className="navbar-brand d-none d-md-inline">
                BikeRides
              </Link>
              <Link to="/" className="btn btn-outline-light my-2 my-sm-0 mx-2">
                Home
              </Link>
            </div>
            <div>
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="dropdown" ref={dropdownRef}>
                    <button
                      className="btn btn-secondary dropdown-toggle mx-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      Hello {tempuser}
                    </button>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                      <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Profile
                      </Link>
                      {/* Add Bike and Logout options will be hidden by default */}
                      <div className="d-lg-none">
                        {isAdmin && (
                          <Link to="/add-bike" className="dropdown-item">
                            Add Bike
                          </Link>
                        )}
                        <button className="btn btn-danger btn-outline-light my-2 my-sm-0 mx-2" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Add Bike and Logout options will be visible by default on larger screens */}
                  <div className="d-none d-lg-flex">
                    {isAdmin && (
                      <Link to="/add-bike" className="btn btn-danger mx-2">
                        Add Bike
                      </Link>
                    )}
                    <button className="btn btn-outline-light my-2 my-sm-0 mx-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/signup" className="btn btn-outline-light my-2 my-sm-0">
                    Signup / Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;


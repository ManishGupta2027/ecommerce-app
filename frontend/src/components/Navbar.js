import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ShopName</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart"></i> Cart
              </Link>
            </li>
            {user ? (
              <li className="nav-item" style={{ position: 'relative' }}>
                <div
                  className="nav-link d-flex align-items-center justify-content-center"
                  onClick={toggleProfile}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    borderRadius: '50%',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>
                {showProfile && (
                  <UserProfile
                    user={user}
                    onClose={() => setShowProfile(false)}
                  />
                )}
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

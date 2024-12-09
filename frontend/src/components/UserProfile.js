import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login
    onClose(); // Close the profile dropdown
  };

  return (
    <div
      className="user-profile-dropdown"
      style={{
        position: 'absolute',
        top: '50px',
        right: '10px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '200px',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: '10px',
          borderBottom: '1px solid #eee',
          textAlign: 'center',
        }}
      >
        <strong>{user.email}</strong>
      </div>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: '10px',
        }}
      >
        <li
          style={{ padding: '5px 0', cursor: 'pointer', color: '#007bff' }}
          onClick={() => {
            navigate('/user'); // Navigate to the user's profile page
            onClose();
          }}
        >
          View Profile
        </li>
        <li
          style={{ padding: '5px 0', cursor: 'pointer', color: '#ff4d4d' }}
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;

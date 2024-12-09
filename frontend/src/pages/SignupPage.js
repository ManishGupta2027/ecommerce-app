import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }
    const id = 1;
    // Dummy signup logic for the demo
    const newUser = { id, email, password };
    localStorage.setItem('user', JSON.stringify(newUser)); // Store user data in localStorage
    alert('Signup Successful!');
    navigate('/'); // Redirect to the home page or product listing
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
            
            <button onClick={handleSignup} className="btn btn-primary w-100 mb-3">
              Sign Up
            </button>
            
            <p className="text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

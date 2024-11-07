import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Save the JWT token in localStorage
      localStorage.setItem('jwt', token);

     
      navigate('/');
    }
  }, [navigate]);

  return <p>Authenticating...</p>;
};

export default OAuthCallback;
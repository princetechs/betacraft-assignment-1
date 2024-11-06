import React, { useState } from 'react';
import GoogleLoginButton from './components/GoogleLoginButton';
import { authenticateWithGoogle, User } from './services/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = async (response: any) => {
    try {
      const userData = await authenticateWithGoogle(response.tokenId);
      setUser(userData);
    } catch (error) {
      setError('Failed to authenticate. Please try again.');
    }
  };

  const handleLoginFailure = (error: any) => {
    console.error('Login failed:', error);
    setError('Google Login failed. Please try again.');
  };

  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!user ? (
        <GoogleLoginButton
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default App;
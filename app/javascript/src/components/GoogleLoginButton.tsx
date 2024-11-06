// src/components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';

interface GoogleLoginButtonProps {
  onLoginSuccess: (response: any) => void;
  onLoginFailure: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleLogin
      clientId={"670738617583-rl2v2abfahf6387isld62g96b1e325vl.apps.googleusercontent.com"
      }
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
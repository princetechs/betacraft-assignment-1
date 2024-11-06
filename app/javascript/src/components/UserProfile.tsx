// src/components/UserProfile.tsx
import React from 'react';

interface User {
  name: string;
  email: string;
}

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
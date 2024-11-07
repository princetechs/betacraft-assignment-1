import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

const UserProfile: React.FC = () => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
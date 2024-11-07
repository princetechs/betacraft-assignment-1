// src/components/project/InviteMember.tsx
import React, { useState } from 'react';
import api from '../../services/api';

const InviteMember: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleInvite = async () => {
    try {
      await api.post(`/projects/${projectId}/invite`, { email });
      setMessage('User invited successfully');
      setEmail('');
    } catch {
      setMessage('Unable to invite user');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleInvite}>Invite</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InviteMember;
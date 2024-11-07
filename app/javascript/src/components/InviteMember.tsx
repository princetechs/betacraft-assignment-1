// src/components/InviteMember.tsx
import React, { useState } from 'react';
import axios from 'axios';

const InviteMember: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleInvite = () => {
    axios.post(`/api/v1/projects/${projectId}/invite`, { email })
      .then(() => {
        setMessage('User invited successfully');
        setEmail('');
      })
      .catch(() => {
        setMessage('Unable to invite user');
      });
  };

  return (
    <div>
      <h3>Invite Member</h3>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="button" onClick={handleInvite}>Invite</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InviteMember;

// src/components/CompleteTask.tsx
import React, { useState } from 'react';
import api from '../../services/api';

interface CompleteTaskProps {
  taskId: string;
}

const CompleteTask: React.FC<CompleteTaskProps> = ({ taskId }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleComplete = () => {
    api.patch(`/tasks/${taskId}/complete`, { completed: true })
      .then((response) => {
        setMessage('Task marked as completed');
      })
      .catch(() => {
        setMessage('Unable to complete task');
      });
  };

  return (
    <div>
      <button type="button" onClick={handleComplete}>Mark as Completed</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CompleteTask;

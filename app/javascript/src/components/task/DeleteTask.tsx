// src/components/DeleteTask.tsx
import React, { useState } from 'react';
import api from '../../services/api';

interface DeleteTaskProps {
  taskId: string;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = () => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        setMessage('Task deleted successfully');
      })
      .catch(() => {
        setMessage('Unable to delete task');
      });
  };

  return (
    <div>
      <button type="button" onClick={handleDelete}>Delete Task</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteTask;

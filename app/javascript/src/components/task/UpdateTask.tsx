// src/components/UpdateTask.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface UpdateTaskProps {
  taskId: string;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ taskId }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the task details
    api.get(`/api/v1/tasks/${taskId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch(() => {
        setMessage('Unable to fetch task details');
      });
  }, [taskId]);

  const handleSubmit = () => {
    api.patch(`/tasks/${taskId}`, { title, description })
      .then(() => {
        setMessage('Task updated successfully');
      })
      .catch(() => {
        setMessage('Unable to update task');
      });
  };

  return (
    <div>
      <h3>Update Task</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>Update Task</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateTask;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateTask: React.FC = () => {
  const { projectId } = useParams();  // Get projectId from URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    api.post(`/projects/${projectId}/tasks`, { title, description })
      .then((response) => {
        setMessage('Task created successfully');
        setTitle('');
        setDescription('');
        navigate(`/projects/${projectId}/tasks`);  // Redirect after task creation
      })
      .catch(() => {
        setMessage('Unable to create task');
      });
  };

  return (
    <div>
      <h3>Create Task</h3>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>Create Task</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateTask;

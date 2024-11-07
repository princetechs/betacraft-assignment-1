// src/components/project/CreateProject.tsx
import React, { useState } from 'react';
import api from '../../services/api';

const CreateProject: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects', { project: { name, description } });
      setName('');
      setDescription('');
    } catch (error) {
      setError('Error creating project');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProject;
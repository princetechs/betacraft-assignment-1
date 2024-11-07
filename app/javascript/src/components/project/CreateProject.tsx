import React, { useState } from 'react';
import api from '../../services/api'; // Import the custom API instance

const CreateProject: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api
      .post('/projects', { project: { name, description } }) // Using custom api instance
      .then((response) => {
        console.log('Project created successfully:', response.data);
        setName('');
        setDescription('');
      })
      .catch((error) => {
        setError('Error creating project');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Create a New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;

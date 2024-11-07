import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the custom API instance

const DeleteProject: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    api.delete(`/projects/${id}`)
      .then(() => {
        console.log('Project deleted successfully');
        navigate('/projects');
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <button onClick={handleDelete}>Delete Project</button>
  );
};

export default DeleteProject;

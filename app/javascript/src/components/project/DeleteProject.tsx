// src/components/project/DeleteProject.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DeleteProject: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${id}`);
      console.log('Project deleted');
      navigate('/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return <button className='delete' onClick={handleDelete}>Delete Project</button>;
};

export default DeleteProject;
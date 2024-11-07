// src/components/ProjectsList.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            <Link to={`/projects/${project.id}`} className="text-blue-500 hover:text-blue-700">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/projects/new" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
        Create New Project
      </Link>
    </div>
  );
};

export default ProjectsList;

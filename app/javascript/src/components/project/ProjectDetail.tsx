// src/components/project/ProjectDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import DeleteProject from './DeleteProject';
import InviteMember from './InviteMember';
import ProjectTasks from './ProjectTasks';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    if (id) fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (id) {
        const response = await api.patch(`/projects/${id}`, { project: { name: project.name, description: project.description } });
        setProject(response.data);
        navigate(`/projects/${id}`);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <input
        type="text"
        value={project.name}
        onChange={(e) => setProject({ ...project, name: e.target.value })}
      />
      <textarea
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
      />
      <button className='update' onClick={handleUpdate}>Update Project</button>

      {/* Include delete and invite components */}
      {id && <DeleteProject id={id} />}
      {id && <InviteMember projectId={id} />}

      {/* Include project tasks management */}
      {id && <ProjectTasks projectId={id} />}
    </div>
  );
};

export default ProjectDetail;
// src/components/ProjectDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import DeleteProject from './DeleteProject'; 
import InviteMember from './InviteMember'; 
import '../../styles/Project.css';
import ProjectTasks from '../ProjectTasks';
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/projects/${id}`)
        .then((response) => {
          setProject(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
        })
        .catch((error) => {
          console.error('Error fetching project:', error);
        });
    }
  }, [id]);

  const handleUpdate = () => {
    if (id) {
      api.patch(`/projects/${id}`, { project: { name, description } })
        .then((response) => {
          setProject(response.data);
          navigate(`/projects/${id}`);
        })
        .catch((error) => {
          console.error('Error updating project:', error);
        });
    }
  };

  if (!project) return <p>Loading project...</p>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <h3>Edit Project</h3>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="button" onClick={handleUpdate}>Update Project</button>
      </form>

      {/* Integrating DeleteProject and InviteMember components */}
      {id && <DeleteProject id={id} />}
      {id && <InviteMember projectId={id} />}
      {id && <ProjectTasks/>}
    </div>
  );
};

export default ProjectDetail;

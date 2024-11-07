import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const CreateTask: React.FC<{ projectId: string; onTaskCreated: () => void }> = ({ projectId, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch project members
  const fetchMembers = async () => {
    try {
      const response = await api.get(`/projects/${projectId}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${projectId}/tasks`, { 
        task: { 
          title, 
          description, 
          user_id: assigneeId  // Pass the selected member's ID
        } 
      });
      setTitle('');
      setDescription('');
      setAssigneeId(null);
      onTaskCreated(); // Refresh the task list
    } catch (error) {
      setError('Error creating task');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={assigneeId || ''}
        onChange={(e) => setAssigneeId(Number(e.target.value))}
      >
        <option value="">Select Assignee</option>
        {members.map(member => (
          <option key={member.id} value={member.id}>
            {member.first_name} {member.last_name} ({member.email})
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
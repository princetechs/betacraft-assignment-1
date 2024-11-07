// src/components/task/TaskList.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import TaskDetail from './TaskDetail';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  projectId: string;
}

const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!projectId) {
      console.warn("No projectId provided");
      return;
    }

    try {
      setError(null);
      console.log(`Fetching tasks for project ID: ${projectId}`);
      
      const response = await api.get(`/projects/${projectId}/tasks`);
      console.log('API response:', response);

      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div>
      <h3>Tasks</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <TaskDetail task={task} onTaskUpdated={fetchTasks} onTaskDeleted={fetchTasks} />
            </li>
          ))
        ) : (
          !error && <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
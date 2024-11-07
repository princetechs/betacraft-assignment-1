import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

// Define types for Task and the API response structure
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  project_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface ProjectTasksProps {}

const ProjectTasks: React.FC<ProjectTasksProps> = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Extract projectId from URL
  const [tasks, setTasks] = useState<Task[]>([]); // State for storing the tasks
  const [error, setError] = useState<string | null>(null); // State for handling errors

  useEffect(() => {
    if (!projectId) {
      setError('Project ID is missing.');
      return;
    }

    // Fetch tasks for the specific project
    api.get(`/projects/${projectId}/tasks`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTasks(response.data); // Set tasks only if the response is an array
          setError(null); // Clear any previous errors
        } else {
          setError('Received data is not an array of tasks.');
        }
      })
      .catch((err) => {
        setError('Failed to fetch tasks.');
        console.error('Error fetching tasks:', err);
      });
  }, [projectId]); // Re-run the effect when projectId changes

  return (
    <div>
      <h3>Tasks for Project {projectId}</h3>

      {error && <p className="text-red-500">{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks found for this project.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4">
              <h4 className="font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
              <div>
                {/* Add links or buttons for task actions here */}
                {/* Example: */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => console.log(`Complete task ${task.id}`)}
                >
                  Complete Task
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectTasks;

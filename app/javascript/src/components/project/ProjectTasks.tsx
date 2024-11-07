// src/components/project/ProjectTasks.tsx
import React from 'react';
import CreateTask from '../task/CreateTask';
import TaskList from '../task/TaskList';

const ProjectTasks: React.FC<{ projectId: string }> = ({ projectId }) => {
  return (
    <div>
      <h3>Manage Project Tasks</h3>
      <CreateTask projectId={projectId} onTaskCreated={() => console.log('Task created')} />
      <TaskList projectId={projectId} />
    </div>
  );
};

export default ProjectTasks;
import React, { useState } from 'react';
import api from '../../services/api';
import Comments from '../Comments';

const TaskDetail: React.FC<{ task: any; onTaskUpdated: () => void; onTaskDeleted: () => void }> = ({
  task,
  onTaskUpdated,
  onTaskDeleted,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    try {
      await api.patch(`/projects/${task.project_id}/tasks/${task.id}`, { task: { title, description } });
      onTaskUpdated();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${task.project_id}/tasks/${task.id}`);
      onTaskDeleted();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-detail">
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            className="task-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <textarea
            className="task-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <div className="task-action-buttons">
            <button className="btn-save" onClick={handleUpdate}>
              Save
            </button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-details-view">
          <h4>{title}</h4>
          <p>{description}</p>
          <div className="task-action-buttons">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
            {/* Show comments and allow new comment creation */}
          </div>
          <Comments taskId={task.id} projectId={task.project_id} />

        </div>
      )}
    </div>
  );
};

export default TaskDetail;
import React, { useState, useEffect } from 'react';
import api from '../services/api';

// Define types for comments and their properties
interface Comment {
  id: number;
  content: string;
  user: {
    first_name?: string; // Make first_name optional to handle cases where it's missing
    last_name?: string;  // Make last_name optional as well
  };
}

interface CommentsProps {
  taskId: number;
  projectId: number;
}

const Comments: React.FC<CommentsProps> = ({ taskId, projectId }) => {
  const [comments, setComments] = useState<Comment[]>([]); // State for the comments
  const [newComment, setNewComment] = useState<string>(''); // State for the new comment content
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/tasks/${taskId}/comments`);
        setComments(response.data); // Set fetched comments
      } catch (error) {
        setError('Error fetching comments');
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [taskId, projectId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return; // Don't submit if the comment is empty

    try {
      const response = await api.post(`/projects/${projectId}/tasks/${taskId}/comments`, {
        comment: { content: newComment },
      });
      setComments([response.data, ...comments]); // Prepend the new comment to the list
      setNewComment(''); // Reset the comment input
    } catch (error) {
      setError('Error submitting comment');
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      {comments.length === 0 && <div>No comments available</div>}
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>
            <strong>
              {/* Using optional chaining to safely access the user properties */}
              {comment.user?.first_name ?? 'Unknown User'} {comment.user?.last_name ?? ''}
            </strong>: {comment.content}
          </p>
        </div>
      ))}
      {/* Form to submit a new comment */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default Comments;
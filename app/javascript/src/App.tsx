import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import GoogleOAuthButton from './components/GoogleLoginButton';
import OAuthCallback from './components/OAuthCallback';
import UserProfile from './components/UserProfile';
import ProjectsList from './components/ProjectsList';
import CreateProject from './components/project/CreateProject';
import ProjectDetail from './components/project/ProjectDetail';
import DeleteProject from './components/project/DeleteProject';
import { PrivateRoute } from './components/PrivateRoute';
import InviteMember from './components/project/InviteMember';
import CreateTask from './components/task/CreateTask';
import CompleteTask from './components/task/CompleteTask';
import UpdateTask from './components/task/UpdateTask';
import DeleteTask from './components/task/DeleteTask';
import ProjectTasks from './components/ProjectTasks';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Public Route for Login */}
            <Route path="/auth/callback" element={<OAuthCallback />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            {/* Task Routes */}
            <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
            <Route path="/projects/:projectId/tasks/create" element={<CreateTask />} />
            <Route path="/tasks/:taskId/update" element={<UpdateTask taskId={''} />} />
            <Route path="/tasks/:taskId/complete" element={<CompleteTask taskId={''} />} />
            <Route path="/tasks/:taskId/delete" element={<DeleteTask taskId={''} />} />

            {/* Project Routes */}
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/new"
              element={
                <PrivateRoute>
                  <CreateProject />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <ProjectDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id/delete"
              element={
                <PrivateRoute>
                  <DeleteProject id={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id/invite"
              element={
                <PrivateRoute>
                  <InviteMember projectId={''} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

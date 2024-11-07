import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import GoogleOAuthButton from './components/GoogleLoginButton';
import OAuthCallback from './components/OAuthCallback';
import UserProfile from './components/UserProfile';
import ProjectsList from './components/ProjectsList';
import CreateProject from './components/CreateProject';
import ProjectDetail from './components/ProjectDetail';
import DeleteProject from './components/DeleteProject';
import InviteMember from './components/InviteMember';
import { PrivateRoute } from './components/PrivateRoute';

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

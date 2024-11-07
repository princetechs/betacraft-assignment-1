// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OAuthCallback from './components/OAuthCallback';
import GoogleLoginButton from './components/GoogleLoginButton';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
};

export default App;

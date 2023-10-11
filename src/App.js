import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/auth/login';
import ProtectedRoutes from './protected';
import CustomHeadersComponent from './components/dashboard';
import SignupForm from './components/auth/signup';
import PublicRoutes from './public';
import PageNotFound from './components/PageNotFound';

function App() {
  const client = new QueryClient()
  return (

    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoutes><LoginForm /></PublicRoutes>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<ProtectedRoutes><CustomHeadersComponent /></ProtectedRoutes>} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>

  );
}

export default App;

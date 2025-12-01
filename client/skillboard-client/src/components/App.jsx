import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import Login from './auth/Login';
import Register from './auth/Register';
import TopicSelection from './topics/TopicSelection';
import HomePage from './homepage/HomePage';
import TopicPage from './topics/TopicPage';
import UserPosts from './user/UserPosts';
import Navbar from './Navbar/Navbar';

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        <Route path="/topics/select" element={user ? <TopicSelection /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/topics/:topicId" element={user ? <TopicPage /> : <Navigate to="/login" />} />
        <Route path="/posts" element={user ? <UserPosts /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

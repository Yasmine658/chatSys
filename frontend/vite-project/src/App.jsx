import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import ChatPage from './pages/ChatPage';

import LoginPage from './pages/LoginPage';
import ProfessorList from './components/ProfessorList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/professors" element={<ProfessorList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

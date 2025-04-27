
import { useEffect, useState } from "react";
import { fetchProfessors, fetchMessages } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfessorProfile from "../components/ProfessorProfile";

const ChatPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    const loadProfessors = async () => {
      try {
        const data = await fetchProfessors();
        setProfessors(data);
      } catch (error) {
        console.error("Failed to load professors", error);
      }
    };

    loadProfessors();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSelectProfessor = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleBackToList = () => {
    setSelectedProfessor(null);
  };

  return (
    <div className="chat-page">
      <header>
        <h1>Welcome, {user?.name || "Student"}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main>
        {!selectedProfessor ? (
          <div className="professors-list">
            <h2>Available Professors</h2>
            {professors.length === 0 ? (
              <p>Loading professors...</p>
            ) : (
              <ul>
                {professors.map((prof) => (
                  <li
                    key={prof._id}
                    onClick={() => handleSelectProfessor(prof)}
                    className="professor-item"
                  >
                    
                    {prof.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <ProfessorProfile professor={selectedProfessor} onBack={handleBackToList} />
        )}
      </main>
    </div>
  );
};

export default ChatPage;

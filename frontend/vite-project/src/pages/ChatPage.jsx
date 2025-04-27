import { useEffect, useState } from 'react';
import { fetchProfessors, fetchMessages } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfessorList from '../components/ProfessorList';
import ProfessorProfile from '../components/ProfessorProfile';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import socket from '../socket';

const ChatPage = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) navigate('/');

    const getProfessors = async () => {
      const res = await fetchProfessors();
      setProfessors(res.data);
    };
    getProfessors();
  }, [user, navigate]);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      if ((message.sender === user._id && message.receiver === selectedProfessor?._id) ||
          (message.receiver === user._id && message.sender === selectedProfessor?._id)) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [user, selectedProfessor]);

  const selectProfessor = async (professor) => {
    setSelectedProfessor(professor);
    const res = await fetchMessages(user._id, professor._id);
    setMessages(res.data);
  };

  const sendMessage = (content) => {
    socket.emit('send_message', {
      senderId: user._id,
      receiverId: selectedProfessor._id,
      content,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-gray-50 border-r">
        <button onClick={logoutUser} className="text-red-500 mb-4">Logout</button>
        <ProfessorList 
  professors={professors} 
  onSelect={selectProfessor} 
/>

          </div>
      <div className="w-3/4 p-4 flex flex-col">
        {selectedProfessor ? (
          <>
            <ProfessorProfile professor={selectedProfessor} />
            <ChatWindow messages={messages} currentUser={user} />
            <MessageInput onSend={sendMessage} />
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400">Select a professor to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

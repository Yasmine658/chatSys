import React from 'react';

function ProfessorList({ professors, onSelect }) {
  const handleProfessorClick = (professor) => {
    if (typeof onSelect === 'function') {
      onSelect(professor);
    } else {
      console.error('onSelect is not a function');
    }
  };

  return (
    <div className="professor-list">
      <h2>Professors</h2>
      {professors.length > 0 ? (
        professors.map((prof) => (
          <div 
            key={prof._id} 
            onClick={() => handleProfessorClick(prof)}
            className="professor-item"
          >
            <img 
              src={prof.profilePicture || '/default-avatar.png'} 
              alt={prof.username} 
              width="50" 
              height="50"
              className="professor-avatar"
            />
            <div className="professor-info">
              <p className="professor-name">{prof.username}</p>
              {prof.name && <p className="professor-fullname">{prof.name}</p>}
            </div>
          </div>
        ))
      ) : (
        <p>No professors available</p>
      )}
    </div>
  );
}

export default ProfessorList;
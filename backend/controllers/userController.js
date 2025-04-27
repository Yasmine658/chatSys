const User = require('../models/Userchat');

exports.getProfessors = async (req, res) => {
  try {
    const professors = await User.find({ role: 'professor' }).select('-password');
    
    const formattedProfessors = professors.map(professor => ({
      _id: professor._id,
      email: professor.email,
      profilePicture: professor.profilePicture,
      role: professor.role,
      courses: professor.courses || [],  // Assuming the courses are available in the professor's data
      __v: professor.__v
    }));

    res.json(formattedProfessors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

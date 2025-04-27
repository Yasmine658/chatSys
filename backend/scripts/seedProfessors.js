// scripts/seedProfessors.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/Userchat');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected for seeding');

    const professors = [
      {
        name: "Dr. John Smith",
        email: "john.smith@university.edu",
        password: "$2b$10$abcde12345hashedpassword", 
        profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "professor",
        courses: ["Web Development", "Computer Networks"]
      },
      {
        name: "Prof. Emily Davis",
        email: "emily.davis@university.edu",
        password: "$2b$10$abcde12345hashedpassword", 
        profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "professor",
        courses: ["Database Systems", "Software Engineering"]
      },
      {
        name: "Dr. Michael Brown",
        email: "michael.brown@university.edu",
        password: "$2b$10$abcde12345hashedpassword", 
        profilePicture: "https://randomuser.me/api/portraits/men/54.jpg",
        role: "professor",
        courses: ["Artificial Intelligence", "Machine Learning"]
      }
    ];

    return User.insertMany(professors);
  })
  .then(() => {
    console.log('Professors seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
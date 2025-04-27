const Message = require('../models/Message'); 

const getMessages = async (req, res) => {
  const { userId, professorId } = req.query;

  if (!userId || !professorId) {
    return res.status(400).send('Both userId and professorId are required.');
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: professorId },
        { senderId: professorId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); 

    if (!messages) {
      return res.status(404).send('No messages found.');
    }

    res.status(200).json({ data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getMessages };

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    room: { // Identifier for the chat room (e.g., 'coding', 'general')
      type: String,
      required: true,
      index: true, // Index for faster fetching of room messages
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: { // Store name denormalized for easier display
        type: String,
        required: true,
      },
    },
    text: {
      type: String,
      required: true,
    },
    // Timestamp is automatically added by mongoose { timestamps: true }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
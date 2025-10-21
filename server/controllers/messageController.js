import Message from '../models/messageModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// @desc    Get messages for a specific room
// @route   GET /api/messages/:roomName
// @access  Private (Only logged-in users can fetch messages)
export const getRoomMessages = asyncHandler(async (req, res) => {
  const { roomName } = req.params;
  // Fetch messages, sort by oldest first, limit to last 50 (optional)
  const messages = await Message.find({ room: roomName })
                                .sort({ createdAt: 1 }) // Use 1 for ascending (oldest first)
                                .limit(50); // Limit history size

  res.status(200).json(new ApiResponse(200, messages, 'Messages retrieved successfully'));
});
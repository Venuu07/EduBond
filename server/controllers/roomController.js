import Room from '../models/roomModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// @desc    Get all defined rooms
// @route   GET /api/rooms
// @access  Public (or Private if only logged-in users can see rooms)
export const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({}).sort({ name: 1 }); // Sort alphabetically
  res.status(200).json(new ApiResponse(200, rooms, 'Rooms retrieved successfully'));
});

// @desc    Create a new room (potentially admin only later)
// @route   POST /api/rooms
// @access  Private (for now, any logged-in user can create)
export const createRoom = asyncHandler(async (req, res) => {
  const { name, slug, description, category } = req.body;

  if (!name || !slug || !description) {
    throw new ApiError(400, 'Name, slug, and description are required');
  }

  // Check if slug already exists
  const slugExists = await Room.findOne({ slug });
  if (slugExists) {
    throw new ApiError(400, 'Room slug must be unique');
  }

  const room = await Room.create({
    name,
    slug,
    description,
    category,
  });

  res.status(201).json(new ApiResponse(201, room, 'Room created successfully'));
});
import MentorshipSession from "../models/mentorshipSessionModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getSessions=asyncHandler(async(req,res)=>{
    const sessions=await MentorshipSession.find({}).populate('mentor','name');
    res.status(200).json(new ApiResponse(200,sessions,'Mentorship sessions retrieved successfully'));
});

export const createSession=asyncHandler(async(req,res)=>{
    const {title,description,slots}=req.body;

    if (!title || !description || !slots || slots.length===0) {
        throw new ApiError(400, 'All fields,including at least one slot, are required');
    }

    const session=await MentorshipSession.create({
        mentor:req.user._id,
        title,
        description,
        slots,
    });
    res.status(201).json(new ApiResponse(201,session,'Mentorship session created successfully'));
})

export const bookSlot = asyncHandler(async (req, res) => {
  const { sessionId, slotId } = req.params; // Get IDs from the URL
  const userId = req.user._id; // Get the mentee's ID from the token

  const session = await MentorshipSession.findById(sessionId);

  if (!session) {
    throw new ApiError(404, 'Mentorship session not found');
  }

  // Find the specific slot within the session's slots array
  const slot = session.slots.id(slotId);

  if (!slot) {
    throw new ApiError(404, 'Time slot not found');
  }

  // Check if the user trying to book is the mentor themselves
  if (session.mentor.toString() === userId.toString()) {
    throw new ApiError(400, 'Mentors cannot book their own sessions');
  }

  // Check if the slot is already booked
  if (slot.isBooked) {
    throw new ApiError(400, 'This time slot is already booked');
  }

  // Mark the slot as booked
  slot.isBooked = true;
  slot.bookedBy = userId;

  await session.save(); // Save the changes to the entire session document

  res.status(200).json(new ApiResponse(200, slot, 'Time slot booked successfully'));
});

export const getSessionById = asyncHandler(async (req, res) => {
    const session = await MentorshipSession.findById(req.params.id)
       .populate('mentor', 'name') // Get mentor's name
    .populate('slots.bookedBy', 'name');

    if (session) {
     res.status(200).json(new ApiResponse(200, session, 'Session retrieved successfully'));  
    } else {
       throw new ApiError(404, 'Mentorship session not found'); 
    }
})

export const getMyBookedSessions = asyncHandler(async (req, res) => {
  // We keep the robust query and populate
  try {
    const bookedSessions = await MentorshipSession.find({ 'slots.bookedBy': req.user._id })
      .populate('mentor', 'name')
      .populate({
        path: 'slots',
        populate: { path: 'bookedBy', select: 'name' }
      })
      .select('title mentor slots');

    // Filter AFTER fetching to simplify structure for frontend
    const relevantSessions = bookedSessions.map(session => {
       const bookedSlot = session.slots.find(
         slot => slot.bookedBy?._id?.toString() === req.user._id.toString()
       );
       // Return the structure the frontend expects
       return {
         _id: session._id,
         title: session.title,
         mentor: session.mentor, // Mentor object { _id, name }
         bookedSlot: bookedSlot // The specific slot object booked by the user
       };
    }).filter(session => session.bookedSlot); // Ensure we only keep sessions with a relevant slot

    // --- RESTORED: Send the actual array ---
    res.status(200).json(new ApiResponse(200, relevantSessions, 'Booked sessions retrieved'));
    // ---------------------------------------

  } catch (error) {
    console.error("Error fetching booked sessions:", error);
    throw new ApiError(500, 'Server error while fetching booked sessions.');
  }
});

export const getMyOfferedSessions = asyncHandler(async (req, res) => {
  // We keep the robust query and populate
  const offeredSessions = await MentorshipSession.find({ mentor: req.user._id })
    .populate({
      path: 'slots',
      populate: { path: 'bookedBy', select: 'name' }
    });

  // --- RESTORED: Send the actual array ---
  res.status(200).json(new ApiResponse(200, offeredSessions, 'Offered sessions retrieved'));
  // ---------------------------------------
});
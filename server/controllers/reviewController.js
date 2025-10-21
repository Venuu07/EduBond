import Review from '../models/reviewModel.js';
import Gig from '../models/gigModel.js'; // Need Gig model to verify completion status
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';


export const createReview = asyncHandler(async (req, res) => {
  const { targetUserId, rating, comment, contextId, contextType } = req.body;
  const authorUserId = req.user._id; // Get author from token

  // --- Basic Validation ---
  if (!targetUserId || !rating || !contextId || !contextType) {
    throw new ApiError(400, 'Missing required review fields');
  }
  if (rating < 1 || rating > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  // --- Context-Specific Validation (Example for Gigs) ---
  if (contextType === 'Gig') {
    const gig = await Gig.findById(contextId);
    if (!gig) throw new ApiError(404, 'Gig not found');
    if (gig.status !== 'completed') throw new ApiError(400, 'Gig must be completed to leave a review');
    // Ensure the reviewer was involved (either owner reviewing assignee, or assignee reviewing owner)
    const isOwner = gig.user.toString() === authorUserId.toString();
    const isAssignee = gig.assignedTo?.toString() === authorUserId.toString();
    if (!isOwner && !isAssignee) throw new ApiError(403, 'Not authorized to review this gig');
    // Ensure owner is reviewing assignee, or vice versa
    if (isOwner && gig.assignedTo?.toString() !== targetUserId) throw new ApiError(400, 'Invalid review target');
    if (isAssignee && gig.user.toString() !== targetUserId) throw new ApiError(400, 'Invalid review target');
  }
  // Add similar validation blocks for 'SkillExchange' and 'Mentorship' if needed

  // --- Check for Existing Review (using unique constraint) ---
  const uniqueConstraintString = `${authorUserId}-${contextType}-${contextId}`;
  const existingReview = await Review.findOne({ uniqueConstraint: uniqueConstraintString });
  if (existingReview) {
     throw new ApiError(400, 'You have already reviewed this interaction');
  }

  // --- Create the Review ---
  const review = await Review.create({
    targetUser: targetUserId,
    authorUser: authorUserId,
    rating,
    comment,
    context: { id: contextId, type: contextType },
    uniqueConstraint: uniqueConstraintString // Add the constraint string
  });

  const reviews = await Review.find({ targetUser: targetUserId });

  // 3. Calculate the new average
  const numReviews = reviews.length;
  const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
  const averageRating = numReviews > 0 ? totalRating / numReviews : 0;

  // 4. Update the User document
  await User.findByIdAndUpdate(targetUserId, {
    numReviews: numReviews,
    // Round to one decimal place
    averageRating: Math.round(averageRating * 10) / 10,
  });

  res.status(201).json(new ApiResponse(201, review, 'Review created successfully'));
});

export const getUserReviews = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Find reviews targeting the user, populate author name, sort newest first
  const reviews = await Review.find({ targetUser: userId })
                              .populate('authorUser', 'name') // Get the reviewer's name
                              .sort({ createdAt: -1 }); // Newest first

  res.status(200).json(new ApiResponse(200, reviews, 'User reviews retrieved'));
});

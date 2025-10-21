import PortfolioItem from "../models/portfolioItemModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from '../models/userModel.js';

// @desc    Get the logged-in user's portfolio
// @route   GET /api/portfolio
// @access  Private

export const getMyPortfolio = asyncHandler(async (req, res) => {
    const portfolioItems = await PortfolioItem.find({ user: req.user._id });
    res.status(200).json(new ApiResponse(200,portfolioItems,'Portfolio retrieved successfully'));
    
})

export const getUserPortfolio = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Optional: Check if the user ID is valid or if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new ApiError(404, 'User not found');
    }

    // Find portfolio items belonging to the specified user
    const portfolioItems = await PortfolioItem.find({ user: userId })
                                              .sort({ createdAt: -1 }); // Sort newest first

    res.status(200).json(new ApiResponse(200, portfolioItems, "User's portfolio retrieved successfully"));
});
import PortfolioItem from "../models/portfolioItemModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// @desc    Get the logged-in user's portfolio
// @route   GET /api/portfolio
// @access  Private

export const getMyPortfolio = asyncHandler(async (req, res) => {
    const portfolioItems = await PortfolioItem.find({ user: req.user._id });
    res.status(200).json(new ApiResponse(200,portfolioItems,'Portfolio retrieved successfully'));
    
})
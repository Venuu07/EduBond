import Gig from "../models/gigModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


export const getGigs=asyncHandler(async (req,res)=>{
    const gigs=await Gig.find({}).populate('user','name');
    res.status(200).json(new ApiResponse(200,gigs,'Gigs retrived successfully'));
});

export const createGig=asyncHandler(async(req,res)=>{
    const {title,description,skills,price}=req.body;

    const gig=new Gig({
        title,
        description,
        skills,
        price,
        user:req.user._id,
    });
    const createdGig=await gig.save();
    res.status(201).json(new ApiResponse(201,createGig,"Gig created successfully"));
})
import Gig from "../models/gigModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


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

export const getGigById=asyncHandler(async(req,res)=>{
    const gig=await Gig.findById(req.params.id).populate('user','name profilePicUrl');
    if(gig){
        res.status(200).json(new ApiResponse(200,gig,"Gig retrived successfully"));
    }
    else{
        throw new ApiError(404,'Gig not found');
    }
})

export const getMyGigs=asyncHandler(async(req,res)=>{

   const gigs=await Gig.find({user : req.user._id}) ;
   res.status(200)
   .json(new ApiResponse(200,gigs,'User gigs retrieved successfully'))
});


export const applyToGig=asyncHandler(async (req,res)=>{
    
  const gig = await Gig.findById(req.params.id);

  if(!gig){
    throw new ApiError(404, 'Gig not found');
  }

  // A user cannot apply to their own gig

  if(gig.user.toStrinig()===req.user._id.toStrinig()){
    throw new ApiError(400, 'You cannot apply to your own gig');
  }

   // Check if the user has already applied

   const alreadyApplied = gig.applicants.find(
    (applicant) => applicant.user.toString() === req.user._id.toString()
  );

  if (alreadyApplied) {
    throw new ApiError(400, 'You have already applied for this gig');
  }

  gig.applicants.push({user:req.user._id});

  await gig.save();

  res.status(200)
  .json(
    new ApiResponse(
        200,
        {},
        'Application submitted successfully'
    )
  )

})
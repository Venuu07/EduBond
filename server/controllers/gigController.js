import Gig from "../models/gigModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import PortfolioItem from "../models/portfolioItemModel.js";


export const getGigs=asyncHandler(async (req,res)=>{
  const { search, skills } = req.query; 

  const query = {
        status: 'open', // Always filter for open gigs
    };
    if (search) {
        // Add text search for title and description
        // 'i' flag makes it case-insensitive
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

   if (skills) {
        // Skills will be a comma-separated string, e.g., "react,node,mongo"
        const skillsArray = skills.split(',').map(skill => skill.trim());
        // $all ensures the gig has ALL the skills listed
        query.skills = { $all: skillsArray }; 
    }
    // -------------------

    console.log('Gig Query:', query); // For debugging

    // Execute the dynamic query
    const gigs = await Gig.find(query)
                          .populate('user', 'name')
                          .sort({ createdAt: -1 });
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
    res.status(201).json(new ApiResponse(201,createdGig,"Gig created successfully"));
})

// server/controllers/gigController.js

export const getGigById = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id)
    .populate('user', 'name profilePicUrl') // Populate the gig owner's info
    // --- Ensure this nested populate syntax is correct ---
    .populate({
      path: 'applicants', // Populate the applicants array itself
      populate: { // THEN, within each item in the array...
        path: 'user', // ...populate the 'user' field...
        select: 'name' // ...selecting only the 'name'.
      }
    });
    // ----------------------------------------------------

  // Keep the console log for debugging
  console.log('Found Gig (checking applicants):', JSON.stringify(gig, null, 2)); 

  if (gig) {
    res.status(200).json(new ApiResponse(200, gig, "Gig retrieved successfully"));
  } else {
    throw new ApiError(404, 'Gig not found');
  }
});

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

  if(gig.user.toString()===req.user._id.toString()){
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

export const acceptApplicant=asyncHandler(async(req,res)=>{

    const {applicantId}=req.body;

    const gig=await Gig.findById(req.params.id);

    if(!gig){
        throw new ApiError(404,'Gig not found');
    }
    // Only the gig owner can accept an applicant

    if(gig.user.toString()!==req.user._id.toString()){
        throw new ApiError(401,'user not authorized to perform this action'); 
    }
    // Gig must be open to accept an applicant

    if(gig.status!=='open'){
        throw new ApiError(400,'Cannot accept applicant for a non-open gig');
    }
    
    gig.status='assigned';
    gig.assignedTo=applicantId;

    const updatedGig=await gig.save();
    res.status(200)
    .json(new ApiResponse(200,updatedGig,'Applicant accepted successfully'));
  });

  export const completeGig=asyncHandler(async(req,res)=>{
    const gig=await Gig.findById(req.params.id);

    if(!gig){
      throw new ApiError(404,'Gig not found');
    }

     // Security Check: Only the gig owner can mark it as complete
     if(gig.user.toString()!==req.user._id.toString()){
      throw new ApiError(401, 'User not authorized');
     }

     if(gig.status!='assigned' || !gig.assignedTo){
      throw new ApiError(400,'Gig must be assigned before it can be completed')
     }

     gig.status='completed';

     await PortfolioItem.create({
      user:gig.assignedTo,
      title:gig.title,
      description:`Completed a gig for a peer. Skills involved: ${gig.skills.join(', ')}.`,
      context:{
        id:gig._id,
        type:'Gig',
      },
     });

     const updatedGig=await gig.save();
     res.status(200).json(
      new ApiResponse(200,updatedGig,'Gig marked as complete')
     )
  })

  export const getPublicGigsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Find gigs by user, only where status is 'open'
  const gigs = await Gig.find({ user: userId, status: 'open' })
                        .populate('user', 'name')
                        .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, gigs, "User's open gigs retrieved"));
});

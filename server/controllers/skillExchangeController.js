import SkillExchange from "../models/skillExchangeModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getExchanges=asyncHandler(async(req,res)=>{
    const exchanges=await SkillExchange.find({status: 'open'}).populate(
        'user','name'
    );
    res.status(200).json(new ApiResponse(200,exchanges,'Exchanges retrived successfully'));
});

export const createExchange=asyncHandler(async(req,res)=>{
    console.log('Received request body:', req.body); 
    const {skillOffered,skillSought,description}=req.body;

    if (!skillOffered || !skillSought || !description) {
    throw new ApiError(400, 'All fields are required');
  }

  const exchange=await SkillExchange.create({
    skillOffered,
    skillSought,
    description,
    user:req.user._id,
  });

  res.status(201)
  .json(new ApiResponse(
    201,exchange,'Skill exchange created successfully'
  ))
});

export const getExchangeById=asyncHandler(async(req,res)=>{
  // Find the exchange by its ID from the URL (req.params.id)
  const exchange=await SkillExchange.findById(req.params.id).populate(
    'user',
    'name');

    if(exchange){
      res.status(200).json(new ApiResponse(200,exchange,'Exchange retrived successfully'));
    } else{
      throw new ApiError(404,'Exchange not found');
    }
});
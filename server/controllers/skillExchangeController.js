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

export const getExchangeById = asyncHandler(async (req, res) => {
  const exchange = await SkillExchange.findById(req.params.id)
    .populate('user', 'name') // Populate the owner's name
    .populate({ // Correctly populate the user within the proposals array
      path: 'proposals.user',
      select: 'name' // Only get the name of the proposer
    });

  if (exchange) {
    res.status(200).json(new ApiResponse(200, exchange, 'Exchange retrieved successfully'));
  } else {
    throw new ApiError(404, 'Exchange not found');
  }
});

export const proposeSwap=asyncHandler(async (req, res) => {
  const exchange = await SkillExchange.findById(req.params.id);

  if(!exchange) throw new ApiError(404, 'Exchange not found');

  if (exchange.user.toString() === req.user._id.toString()) {
    throw new ApiError(400, 'You cannot propose a swap on your own exchange');
  }

  const alreadyProposed = exchange.proposals.find(p => p.user.toString() === req.user._id.toString());

  if (alreadyProposed) {
    throw new ApiError(400, 'You have already proposed a swap');
  }

  exchange.proposals.push({ user: req.user._id });
  await exchange.save();

  res.status(200).json(new ApiResponse(200, {}, 'Swap proposed successfully'));
})


export const acceptProposal=asyncHandler(async (req, res) => {
 const { proposalUserId } = req.body;
  const exchange = await SkillExchange.findById(req.params.id);

  if (exchange.user.toString() !== req.user._id.toString()) {
    throw new ApiError(401, 'User not authorized');
  }

  if (exchange.status !== 'open') throw new ApiError(400, 'This exchange is no longer open');

  exchange.status = 'matched';
  exchange.matchedWith = proposalUserId;

  const updatedExchange = await exchange.save();
  res.status(200).json(new ApiResponse(200, updatedExchange, 'Proposal accepted successfully'));

})
